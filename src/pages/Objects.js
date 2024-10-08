import React from 'react'
import { RedTriangle } from '../components/RedTriangle';
import { ColoredTriangle } from '../components/ColoredTriangle';
import { RotatingTriangle } from '../components/RotatingTriangle';
import { Cube } from '../components/Cube';

export const Objects = () => {
    return (
        <main>
            <RedTriangle></RedTriangle>

            <ColoredTriangle></ColoredTriangle>

            <RotatingTriangle></RotatingTriangle>

            <Cube></Cube>
        </main>
    )
}
