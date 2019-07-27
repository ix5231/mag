import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Mag from '../utils/mag.js';

const Form = props => (
    <div className="wrap-form">
        <div className="name">
            {props.formName}
        </div>
        <div className="form">
            <input
                type="number"
                id={props.id}
                defaultValue={props.defaultValue}
                onChange={(e) => props.onChange && props.onChange(e.target.value)}/>
        </div>
        <style jsx>{`
            .wrap-form {
                display: flex;
                flex-direction: row;

                flex: 1;
            }

            .name {
                flex: 1;
                text-align: left;
            }

            .form {
                flex: 1;
                text-align: right;
            }
        `}</style>
    </div>
);

function Figure(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        Mag.clear(canvasCtx, canvas.width);
        Mag.drawLines(canvasCtx, canvas.width, props.n);
    });

    return (
        <div>
        <canvas
            ref={canvasRef}
            id='figure'
            width={200}
            height={200}
        ></canvas>
        <style jsx>{`
            div {
                display: table-cell;
                vertical-align: middle;
            }
        `}</style>
    </div>
    );
}

const Result = props => (
    <div className="result">
        <div className="name">{props.name}:</div>
        <div className="value">{props.value}</div>
        <style jsx>{`
            .result {
                flex-direction: row;
                flex: 1;

                display: flex;
            }

            .name {
                flex: 1;
                text-align: left;
            }

            .value {
                flex: 1;
                text-align: right;

                font-weight: bold;
            }
        `}</style>
    </div>
);

const Layout = props => (
    <div id="wrapper">
        {props.children}
        <style jsx global>{`
            * {
                color: #212121;
                background: #fdfdfd;
                font-family:Century Gothic,arial,sans-serif;
            }
        `}</style>
    </div>
);

const Block = props => (
    <article className={props.className}>
        {props.children}
        <style jsx>{`
            article {
                border: 2px solid #812cb2;
                padding: 0.5em;
            }
        `}</style>
    </article>
);

export default function index() {
    const [current, setCurrent] = useState(Mag.defaults.current);
    const [radius, setRadius] = useState(Mag.defaults.radius);
    const [vertex, setVertex] = useState(Mag.defaults.vertex);

    const safeCurrent = current || Mag.defaults.current;
    const safeRadius = 0 < radius && radius || Mag.defaults.radius;
    const safeVertex = 2 < vertex && Math.round(vertex) || Mag.defaults.vertex;

    const B = Mag.calcB(safeCurrent, safeRadius)
    const BPrime = Mag.calcBPrime(safeCurrent, safeRadius, safeVertex)

    return (
        <Layout>
            <Head>
                <title>MagnetSim</title>
            </Head>
            <main>
                <Block className="input-form">
                    <Form formName="I" id="current" onChange={setCurrent} defaultValue={safeCurrent}/>
                    <Form formName="a" id="radius" onChange={setRadius} defaultValue={safeRadius}/>
                    <Form formName="n" id="vertex" onChange={setVertex} defaultValue={safeVertex}/>
                </Block>
                <Block className="result">
                    <Result name="B" value={B}/>
                    <Result name="B'" value={BPrime}/>
                    <Result name="B/B'" value={B / BPrime}/>
                </Block>
                <Block className="figure">
                    <Figure n={safeVertex}/>
                </Block>
            </main>
            <style jsx>{`
                main {
                    margin: 2px auto 2px;

                    display: grid;
                    grid-gap: 5px;

                    text-align: left;
                }

                @media only screen and (min-width: 768px) {
                    main{
                        max-width: 768px;
                        grid-template-columns: 300px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .input-form {
                    grid-row: 1;
                    display: flex;
                    flex-direction: column;
                }

                .result {
                    grid-row: 2;
                    display: flex;
                    flex-direction: column;
                }

                .figure {
                    grid-row: 3;
                    text-align: center;
                    display: table;
                }

                @media only screen and (min-width: 768px) {
                    .input-form {
                        grid-column: 1;
                        grid-row: 1;
                    }
                    
                    .result {
                        grid-column: 1;
                        grid-row: 2 / 4;
                    }

                    .figure {
                        grid-column: 2 / 4;
                        grid-row: 1 / 4;
                    }
                }
            `}</style>
        </Layout>
    );
}
