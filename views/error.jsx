const React = require('react')
const Def = require('./layouts/default')

function error() {
    return (
        <Def>
            <main>
                <h1>404: PAGE NOT FOUND</h1>
                <p>Oops, sorry, we can't find this page!</p>
            </main>
            <li><a href="/breads">Go home</a></li>
        </Def>
    )
}

module.exports = error