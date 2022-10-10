import { Pool } from 'pg';
import format from 'pg-format';

const intVersion = process.env.MINECRAFT_VERSION.split('.').reduce((a,b,idx,arr) => a + (parseInt(b) * Math.pow(10, 2 * (3 - (idx + 1)))), 0);

class Database {
  constructor() {
    this.db = new Pool({ connectionString: process.env.DATABASE });
  }

  /**
   * Query pass-through method. Calls db.query
   * @param  {...any} args Arguments to pass to the query
   */
  async query(...args) {
    const lastArg = args[args.length - 1];
    if(lastArg && (typeof lastArg.query) === 'function') {
      return (lastArg).query(...(args.slice(0, -1)));
    } else {
      return this.db.query(...args)
    }
  }

  async getRows(...args) {
    const result = await this.query(...args);
    return result.rows;
  }

  async getRow(...args) {
    return (await this.getRows(...args))[0];
  }

  /**
   * Runs a series of queries in a transaction
   * @param {Function} queryFn The function to call with the database client. Takes one parameter (Client).
   */
  async withTransaction(queryFn) {
    const client = await this.db.connect();
    try {
      await client.query('BEGIN');
      await queryFn(client);
      await client.query('COMMIT');
    } catch(err) {
      client.query('ROLLBACK');
      console.error(err);
      throw err;
    } finally {
      client.release();
    }
  }

  async updateTextureData(data) {
    this.withTransaction(async (client) => {
      // This can probably be optimized. It should be pretty fast with named parameterized queries
      // Loop and insert textures
      for(const texture of data) {
        const textureQuery = {
          name: 'insert-texture',
          text: `INSERT INTO textures ("name", "category", "group")
            VALUES ($1, $2, $3)
            ON CONFLICT ON CONSTRAINT "textures_unique" DO
            UPDATE SET "name" = $1, "category" = $2, "group" = $3
            RETURNING id`,
          values: [texture.name, texture.category, texture.group]
        };
        const dbTexture = await this.getRow(textureQuery, client);
        // Loop over variant fields and insert them
        const variantNames = Object.keys(texture.variants);
        for(const variantName of variantNames) {
          const variantQuery = {
            name: 'insert-variants',
            text: `INSERT INTO variants ("texture", "name", "texture_path", "model_path", "version")
              VALUES ($1, $2, $3, $4, $5)
              ON CONFLICT ON CONSTRAINT "variants_unique" DO
              UPDATE SET "texture" = $1, "name" = $2, "texture_path" = $3, "model_path" = $4`,
            values: [
              dbTexture.id,
              variantName,
              texture.variants[variantName].textures,
              texture.variants[variantName].models,
              intVersion
            ]
          };
          await client.query(variantQuery);
        }
      }
    });
  }
}

const insance = new Database();

export const dbMiddleware = (req, res, next) => {
  req.db = insance;
  next();
};