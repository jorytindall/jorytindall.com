'use client'; // prevent server side rendering

import React from 'react';
import { ReactNode, useEffect } from 'react';

import RevealJS from 'reveal.js';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import PresentationContent from './PresentationContent';

const SOCKET_IO_SERVER = 'https://reveal-multiplex.glitch.me/';

export default function Presentation({ role, secret, id, src }: { role: string, secret: string | null, id: string, src: string }) {
    let reveal: Reveal.Api;
    let initialised: boolean = false;

    useEffect(() => {
        // must happen when the page is definitely being rendered in a browser
        if (!window.Reveal) {
            reveal = new RevealJS({
                embedded: true, 
                plugins: [ ],
                multiplex: {
                    secret: secret,
                    id: id,
                    url: SOCKET_IO_SERVER
                },
                dependencies: [
                    { src: 'https://reveal-multiplex.glitch.me/socket.io/socket.io.js', async: true },
                    { src: 'https://reveal-multiplex.glitch.me/master.js', async: true },
                    { src: 'https://reveal-multiplex.glitch.me/client.js', async: true },
                ]
            });

            // make our reveal object global, for the master/client scripts
            // NB. this is messy for a few reasons
            // 1. global variables aren't good practise, but necessary here
            // 2. window.Reveal already has a different type, so typescript doesn't like it
            //    If we rewrite the master.js and client.js scripts, we could elect to use a different global
            // @ts-ignore
            window.Reveal = reveal;
        }
    }, []);

    // Assumption: onContentReady happens after the reveal object is created
    const onContentReady = () => {
        console.log('content ready');
        if (!initialised) {
            initialised = true;
            reveal.initialize(); 
        } else { 
            reveal.sync();
        }
    };

    return (<>
        <p>{role} presentation...</p>
        <div className="reveal" style={{ width: '100%', flexGrow: 1, border: 'solid 1px black' }}>
            <div className="slides">
                <PresentationContent src={src} onLoaded={onContentReady} />
            </div>
        </div>
    </>);
};
