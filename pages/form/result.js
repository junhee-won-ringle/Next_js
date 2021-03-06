import SideBar from '../../src/components/form/SideBar';
import styles from '../../styles/Home.module.css'
import Textarea from '../../src/components/form/textarea';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import classnames from 'classnames';

export default function ResultFormPage() {
    const router = useRouter();
    const [form, setForm] = useState({});

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_FORM_GETRESULT, {
            params: { formId: router.query.formId }
        })
            .then(function (res) {
                setForm(res.data.form)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [router.query.formId]);

    const confirmDelete = () => {
        if (window.confirm("설문지를 삭제하면 설문결과도 모두 삭제됩니다. 정말 삭제하시겠습니까?")) {
            axios.delete(process.env.NEXT_PUBLIC_API_FORM_DELETEFORM, {
                data: {formId: router.query.formId}
            })
            .then(res => {
                router.push({
                    pathname: 'home',
                    query: {
                        accessToken: router.query.accessToken
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div>
            <SideBar accessToken={router.query.accessToken}/>
            <div className={styles.flexColumn}>
                <div className={classnames(styles.item, styles.borderTopBlue)}>
                    <Textarea
                        value={form.title}
                        fontSize={40}
                        disabled={true}
                    />
                    <Textarea
                        value={form.info}
                        fontSize={20}
                        disabled={true}
                    />
                </div>
                {form.FormQuestions && form.FormQuestions.map((question, index) => {
                    return <Question
                        key={index}
                        question={question}
                    />
                })}
                <button
                    className={classnames(styles.h50, styles.w150, styles.cPointer, styles.borderR5, styles.m10)}
                    onClick={() => confirmDelete()}
                >Delete
                </button>
            </div>
        </div>
    )
}

const Question = ({ question }) => {
    return (
        <div className={styles.item}>
            <div style={{ display: 'flex', height: 'auto', }}>
                <div style={{ flex: '7', }}>
                    <Textarea
                        value={question.title}
                        fontSize={30}
                        disabled={true}
                    />
                </div>
                <div
                    style={{
                        flex: '1',
                        margin: '10px',
                        fontSize: '15px',
                        borderRadius: '5px',
                        textAlign: 'center',
                    }}
                >
                    {question.questionType}
                </div>
            </div>
            <div>
                {(question.FormQuestionOptions && (question.questionType == 'radio')) &&
                    question.FormQuestionOptions.map((option, index) => {
                        return <div key={index}
                            style={{
                                height: '50px',
                                marginLeft: '4px',
                                display: "flex"
                            }}>
                            <div style={{ 
                                width: '10%',
                                marginLeft:'20px',
                                marginRight: '20px',
                                }}>
                                <Textarea
                                    value={index + 1}
                                    fontSize={20}
                                    disabled={true}
                                />
                            </div>
                            <Textarea
                                value={option.option}
                                fontSize={20}
                                disabled={true}
                            />
                            <br />
                            <br />
                        </div>
                    })}
            </div>
            <div style={{ margin: '20px' }}>결과</div>
            {question.FormQuestionResults &&
                question.FormQuestionResults.map((result, index) => {
                    return <div key={index} style={{height:'50px'}}>
                        <Textarea
                            value={result.content}
                            fontSize={20}
                            disabled={true}
                        />
                        <br />
                        <br />
                    </div>
                })}
        </div>
    )
}