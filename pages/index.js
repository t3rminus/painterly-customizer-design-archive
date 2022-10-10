import Category from '@/components/page/Category';

export default function Home({ categories }) {
  return (
    <>
      {/*
      <h2>The Painterly Pack Customizer Tool</h2>
      <p>
        The Customizer allows you to create a personalized Minecraft texture pack,
        by selecting from a variety of options for each texture. When you've made
        your selections, click 'Create my Painterly Pack' to download a fully-assembled,
        ready to go zip file! Simply place the zip file in your Minecraft resource
        packs folder using the in-game menu option, select it from the list of installed
        resource packs, and you're good to go!
      </p>
      <p>
        Items with the start were created as part of the Painterly Telethon,
        as free-for-all requests by fans in exchange for their generous donations.
        Each one lists the name of the person who donated towards the creation of
        that specific texture by Rhodox!
      </p>
      <p>
        Although the Painterly Pack is provided free of charge, a great deal of time,
        effort and testing has gone into making it what it is today. This effort couldn't
        have been accomplished without the amazing contributions from our community!
      </p>
       */}
      <div>
        {categories.map((c,i) => <Category category={c} key={i} />)}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      categories: [
        {
          name: 'Test Category',
          textures: [
            {
              name: 'Test Texture',
              id: 'test-1',
              options: [
                { id: 'test', name: 'Test1', author: 'test', telethon: false, choice: 'I want dirt'  },
                { id: 'test2', name: 'Test2', author: 'test', telethon: false, choice: 'I want dirt'  }
              ]
            }
          ]
        },
        {
          name: 'Test Category',
          textures: [
            {
              name: 'Test Texture',
              id: 'test-2',
              options: [
                { id: 'test', name: 'Test3', author: 'test', telethon: true, choice: 'I want dirt' },
                { id: 'test2', name: 'Test4', author: 'test', telethon: false, choice: 'I want dirt'  }
              ]
            }
          ]
        }
      ]
    }
  }
};