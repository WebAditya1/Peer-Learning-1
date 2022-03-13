import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../AuthContext";
import { G_API, API } from "../../config";
import { useHistory } from "react-router-dom";
import styles from "./FinalisePop.module.css";

export default function StopPopup({ StopPopup, SetStopPopup, assg }) {
    const history = useHistory();
    const SubmitAction = (e) => {
        e.preventDefault(false);
        history.push("/");
        SetStopPopup(false);
    }
    const { userData, setUserData, setOpen, setMessage } = useContext(
        AuthContext
    );
    const stopReview = () => {
        setUserData((u) => ({ ...u, loader: 1 }));
        fetch(`${API}/api/closeassignment?peer_assignment_id=${assg.assignment_id}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then(
                (res) => {
                    console.log(res);
                    setUserData((u) => ({ ...u, loader: 0 }));
                    setOpen(true);
                    setMessage("Peer learning process stop");
                },
                (err) => {
                    setOpen(true);
                    setMessage("Some thing went wrong ");
                }
            );

    };
    return (
        <>
            {
                StopPopup ? <div id={styles.popup_wrapper} >
                    <div id={styles.whole}>
                        <div className={styles.finalize}>
                            <div id={styles.up}>
                                <p id={styles.submit}>Stop Review ? </p>
                                <div id={styles.popup_close} onClick={() => SetStopPopup(false)}> X </div>
                            </div>
                            <p id={styles.reviews}>Once stopped, none of the students will be able to add marks or reviews</p>
                            <div className={styles.option}>
                                <button id={styles.btn} onClick={(e) => { SetStopPopup(false); stopReview(); }}>Yes</button>
                                <button id={styles.btn1} onClick={() => SetStopPopup(false)}>No</button>
                            </div>
                        </div>
                    </div>
                </div> : null
            }

        </>
    )
}