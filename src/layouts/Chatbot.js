import React, { useState, useEffect, useRef } from "react";
import GoogleFontLoader from "react-google-font-loader";

const Chatbot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const [chat, setChat] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [botTyping, setbotTyping] = useState(false);


    useEffect(() => {

        console.log("called");
        const objDiv = document.getElementById('messageArea');
        objDiv.scrollTop = objDiv.scrollHeight;


    }, [chat])




    const handleSubmit = (evt) => {
        evt.preventDefault();
        const name = "shreyas";
        const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

        if (inputMessage !== "") {

            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            setInputMessage('');
            rasaAPI(name, inputMessage);
        }
        else {
            window.alert("Please enter valid message");
        }

    }


    const rasaAPI = async function handleClick(name, msg) {

        //chatData.push({sender : "user", sender_id : name, msg : msg});


        await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'charset': 'UTF-8',
            },
            credentials: "same-origin",
            body: JSON.stringify({ "sender": name, "message": msg }),
        })
            .then(response => response.json())
            // .then((response) => {
            //     if (response) {
            //         const temp = response[1];
            //         const recipient_id = temp["recipient_id"];
            //         const recipient_msg = temp["text"];


            //         const response_temp = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };


            //         setbotTyping(false);

            //         setChat(chat => [...chat, response_temp]);
            //         // scrollBottom();

            //     }
            // })
            .then((response) => {
                if (response) {
                    const actions = response.map((temp) => {
                        const recipient_id = temp["recipient_id"];
                        const recipient_msg = temp["text"];
                        const recipient_img = temp["image"];
                        return { sender: "bot", recipient_id: recipient_id, msg: recipient_msg, img: recipient_img };
                    })
                    // const temp = response[1];




                    // const response_temp = 


                    setbotTyping(false);

                    setChat(chat => [...chat, ...actions]);
                    // scrollBottom();

                }
            })
    }





    return (
        <body className={` ${showChatbot ? "show-chatbot" : ""}`}>
            <button className="chatbot-toggler" onClick={toggleChatbot}>
                <span class="material-symbols-rounded"><i className="fa-brands fa-rocketchat"></i></span>
                <span class="material-symbols-outlined"> <i class="fa-solid fa-xmark"></i></span>
            </button>

            <div className="chatbot">
                <header>
                    <h2>Chatbot</h2>

                </header>

                {/* ============================================ */}
                <ul class="chatbox" id="messageArea">
                    <li class="chat incoming">
                        <span class="material-symbols-outlined"><i class="fa-solid fa-robot"></i></span>
                        <p>Chào bạn, bạn cần Chatbot tư vấn gì ạ?</p>
                    </li>



                    {chat.map((user, key) => (
                        <div key={key}>
                            {user.sender === 'bot' ?
                                (

                                    <li key={key} class="chat incoming">
                                        <span class="material-symbols-outlined"><i class="fa-solid fa-robot"></i></span>
                                        <p>{user.msg}</p>
                                        {user.img && <img src={user.img} alt="Bot Image" width="200px" height="100px" />}
                                    </li>

                                )

                                : (
                                    <li class="chat outgoing">
                                        <p>{user.msg}</p>
                                    </li>

                                )
                            }
                        </div>
                    ))}
                </ul>
                {/* ========================================== */}
                <div class="chat-input ">

                    <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
                        <div className="col-10" style={{ paddingRight: '0px' }}>
                            <input
                                type="text"
                                placeholder="Enter a message..."
                                spellcheck="false" required
                                onChange={e => setInputMessage(e.target.value)}
                                value={inputMessage}
                                className=""
                            />
                        </div>
                        <div className="col-2 cola">
                            <button type="submit" className="circleBtn" id="send-btn" ><i class="fa-regular fa-paper-plane"></i></button>
                        </div>
                    </form>

                </div>
            </div>
        </body>
    );
};

export default Chatbot;


