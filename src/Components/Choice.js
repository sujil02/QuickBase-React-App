import React from "react";
import {Link} from 'react-router-dom'
import '../css/FieldBuilder.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';

const Choice = ({choiceName, deleteChoice}) =>
    <div>
        {choiceName.length > 40 ? (
            <li className="list-group-item alert">
                {choiceName}
                <Link onClick={() => deleteChoice(choiceName)}
                      to={`/`} className="fa fa-trash float-right"/>
            </li>
        ) : (
            <li className="list-group-item">
                {choiceName}
                <Link onClick={() => deleteChoice(choiceName)}
                      to={`/`} className="fa fa-trash float-right"/>
            </li>
        )}
    </div>

export default Choice