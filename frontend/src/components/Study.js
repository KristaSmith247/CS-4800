import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Study() {
    const [word, setWord] = useState(""); // word from database
    const [testList, setTestList] = useState(["si", "no", "azul", "verde"]);
    // const [type, setType] = useState("general");
    const [click, setClick] = useState(0);

    const mytestList = [['si', 'yes'], ['no', 'no'], ['azul', 'blue'], ['verde', 'green']];
    const studentTestList = [['estudiante', 'student'], ['boligrafo', 'pen'], ['lapiz', 'pencil']];
    const businessTestList = [['business', 'businessTest'], ['pagar', 'pay'], ['costar', 'cost']];
    const travelTestList = [['viajar', 'travel'], ['volar', 'fly'], ['donde', 'where']];

    const getWord = (sentArray) => {
        const toReturn = sentArray[Math.floor(Math.random() * sentArray.length)];
        return toReturn;
    }

    function onClickHandler() {
        setWord(getWord(mytestList));
        setClick(click + 1);
    }

    useEffect(() => {
        setWord(getWord(mytestList));
    }, [click]);


    // const getWord = () => {
    //     async function getVocabWord() {
    //         const response = await fetch(``); // set up db
    //         if (!response.ok) {
    //             const message = `An error occurred: ${response.statusText}`;
    //             window.alert(message);
    //             return;
    //         }

    //         const word = await response.json();
    //         setWord(word);
    //     }

    //     getVocabWord();
    //     console.log(word);
    // }


    return (
        <div className="container">
            <p>testList</p>
            <button onClick={() => onClickHandler(testList)}>Get Word</button>
            <h1>Vocabulary Practice</h1>
            <div className="word">{word[0]}</div>
            <div className="word">{word[1]}</div>
        </div >
    )
}
