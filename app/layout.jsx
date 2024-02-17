// Next JS is using server-side mode as default rendering

// @ is a root path
import '@/styles/globals.css'

import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

// IS Data in <head> tag HTML, 
export const metadata = {
    title: 'Promptopia', // title tag
    description: 'Discover & Share AI Prompts' // meta description, for more details pleace check: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
}

// next js is react framework, we can use react features in next js. it was have advanced features in react
function RootLayout({children}) {
    // We can set html template directly in jsx, when we use react we define it in html file

    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient'></div>
                    </div>

                    <main className='app'>
                        <Nav />
                        {/* Children is a page want to be rendered, the filename is page.jsx */}
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout