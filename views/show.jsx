const React = require('react')
const Default = require('./layouts/default')

function Show({ bread }) {
    // Confirm we are getting bread data in the terminal.
    // console.log(bread.name)
    return (
        <Default>
            <h3>{ bread.name }</h3>
            <p>
                This bread
                {
                    bread.hasGluten
                    ? <span> does </span>
                    : <span> does NOT </span>
                }
                have gluten.
            </p>
            <img src={ bread.image } alt={ bread.name } />
            <p>{ bread.getBakedBy() }</p>
            <a href={ `/breads/${bread.id}/edit` }>
                <button>Edit</button>
            </a>
            <form action={ `/breads/${bread.id}?_method=DELETE` } method="POST">
                <input type='submit' value="DELETE" />
            </form>
        </Default>
    )
}

module.exports = Show