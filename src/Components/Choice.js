import React from "react";
import {Link} from 'react-router-dom'
import '../css/FieldBuilder.css'

const Choice = ({choiceName, deleteChoice}) =>
    <div>
        {choiceName.length>40 ? (
            <li className="list-group-item alert">
                {choiceName}
                <Link onClick={() => deleteChoice(choiceName)}
                      to={`/`}> remove</Link>
            </li>
        ) : (
            <li className="list-group-item">
                {choiceName}
                <Link onClick={() => deleteChoice(choiceName)}
                      to={`/`}> remove</Link>
            </li>
        )}
    </div>

export default Choice