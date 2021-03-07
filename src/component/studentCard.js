import React, { useState } from 'react'

export default function StudentCard(props) {
    const [expand, setExpand] = useState(false);
    const [inputTag, setInputTag] = useState();

    return (
        <div className="studentCardContainer">
            <div className="studentInfo">
                <img src={props.pic} alt="studentPic" />
                <div>
                    <h1>{props.firstName} {props.lastName}</h1>
                    <div >
                        <ul style={{ display: 'block', listStyle: 'none'}}>

                            <li>Email: {props.email}</li>
                            <li>Company: {props.company}</li>
                            <li>Skill: {props.skill}</li>
                            <li>Average: {(props.grades.reduce((a, b) => Number(a) + Number(b), 0) / props.grades.length).toFixed(2)}</li>
                            <li>
                                {props.tags ? props.tags.map(tag => <span style={{padding:"5px",background:"lightGrey", margin:"5px",borderRadius:"5px"}}> {tag} </span>) : <div />}
                                <div style={{ borderBottom: "1px solid rgba(189, 189, 189, 0.658)", marginTop: "20px", padding: "2px" }}>
                                    <input placeholder="Add a Tag" style={{ border: "none", outline: "none" }}  onInput={(e) => setInputTag(e.target.value)} onKeyDown={
                                        e => {
                                            if (e.key === "Enter") {
                                                props.addTag(props.email, inputTag)
                                                e.target.value = ''

                                            }
                                        }

                                    } />
                                </div>

                            </li>
                        </ul>

                    </div>
                    <div>

                        {
                            expand ?
                                <div>
                                    {props.grades.map((grade, i) => <h3>Test {i + 1}: {grade} </h3>)}
                                </div> :
                                <div />
                        }
                    </div>
                </div>


            </div>
            <div className="icon">
                {
                    expand ?
                        <button onClick={() => {
                            setExpand(!expand)
                        }}> <i class="fas fa-minus"></i></button>
                        : <button onClick={() => {
                            setExpand(!expand)
                        }}> <i class="fas fa-plus"></i></button>
                }
            </div>
        </div>
    )
}
