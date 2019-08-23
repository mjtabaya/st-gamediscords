import React from 'react';
import { postNewGame } from "../redux/gameActions";

const NewGameForm = ({onNewGame = f => f}) => {
    let name, description, servers, platform
    const submit = e => {
        e.preventDefault()
        onNewGame(name.value, description.value, servers.value, platform.value)
        name.value = ''
        description.value = ''
        servers.value = ''
        platform.value = ''
        name.focus()
    }

    return (
        <form onSubmit={postNewGame}>
            <input  ref={input => name = input}
                    type="text"
                    placeholder="Name..." required />
            <input  ref={input => description = input}
                    type="text"
                    placeholder="Description..." required />
            <input  ref={input => servers = input}
                    type="text"
                    placeholder="NA/EU, JP, SEA..." required />
            <input  ref={input => platform = input}
                    type="text"
                    placeholder="iOS, Android, Windows..." required />
            <button type="submit">Add Game</button>
        </form>
    )
}

export default NewGameForm;
