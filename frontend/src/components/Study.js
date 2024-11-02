import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Study() {
    const params = useParams();
    const [accountInfo, setAccountInfo] = useState({
        username: "",
        password: "",
        type: "",
    });

    const [word, setWord] = useState(""); // word from database
    const [testList, setTestList] = useState(["si", "no", "azul", "verde"]);
    // const [type, setType] = useState("general");
    const [click, setClick] = useState(0);
    const [url, setUrl] = useState("");

    // get account information on load
    useEffect(() => {
        async function fetchData() {
            // fetch account data based on id
            const id = params.id.toString();
            const response = await fetch(`http://localhost:4000/accounts/${id}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const account = await response.json();
            if (!account) {
                window.alert(`Account with id ${id} not found`);
                navigate("/");
                return;
            }
            setAccountInfo(account);
        }
        fetchData();
    }, [params.id]);

    if (accountInfo.type == "" || accountInfo.type == null) {
        accountInfo.type = "general";
    }
    console.log("In study");
    console.log(accountInfo.type);
    console.log(accountInfo.username);

    // fetch from database dependent on account type
    // if (accountInfo.type == "business") {
    //     setListType("business");
    // } else if (accountInfo.type == "student") {

    // } else if (accountInfo.type == "travel") {

    // } else {

    // };

    const mytestList = [['si', 'yes'], ['no', 'no'], ['azul', 'blue'], ['verde', 'green']];
    const studentTestList = [['estudiante', 'student'], ['boligrafo', 'pen'], ['lapiz', 'pencil']];
    const businessTestList = [['business', 'businessTest'], ['pagar', 'pay'], ['costar', 'cost']];
    const travelTestList = [['viajar', 'travel'], ['volar', 'fly'], ['donde', 'where']];

    // const getWord = (sentArray) => {
    //     const toReturn = sentArray[Math.floor(Math.random() * sentArray.length)];
    //     return toReturn;
    // }

    function onClickHandler() {
        //setWord(getWord(mytestList));
        setClick(click + 1);
    }

    useEffect(() => {
        // setWord(getWord(mytestList)); // test words
        async function getWord() {
            const response = await fetch(`http://localhost:4000/get-word`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const word = await response.json();
            setWord(word);
        }
        getWord();
        console.log(word);
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
            <div className="account-info">
                <h1>{accountInfo.type} Account</h1>
            </div>
            <p>
                {accountInfo.username} <br />
                {accountInfo.password} <br />
                {accountInfo.type}
            </p>
            <p>testList</p>
            {/* <button onClick={() => onClickHandler(testList)}>Get Word</button> */}
            <button onClick={() => onClickHandler()}>Get Word</button>
            <h1>Vocabulary Practice</h1>
            <div className="word">{word[0]}</div>
            <div className="word">{word[1]}</div>
        </div >
    )
}
