import { useState } from "react";

export default function Player({name,symbol,isActive}) {
    const [playerName , setPLayerName] = useState(name);
    const [isEditing,setIsEditing] = useState(false);
    const handleEdit = () => {
        setIsEditing((flag)=>!flag)
    }
    const handleNameChange = (e) => {
        setPLayerName(e.target.value);
    }
    let playerNameElement = (<span className="player-name">{playerName}</span>);
    if(isEditing){
        playerNameElement = <input type="text" value={playerName} onChange={handleNameChange}/>
    }
    return (
        <li className={isActive ? 'active': ''}>
            <span className="player">
                { playerNameElement }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{ isEditing ? 'Save' :  'Edit'}</button>
        </li>
    );
}