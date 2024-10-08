import React from 'react'
import { RedTriangle } from '../components/RedTriangle';
import { ColoredTriangle } from '../components/ColoredTriangle';
import { RotatingTriangle } from '../components/RotatingTriangle';
import { Cube } from '../components/Cube';

export const Objects = () => {
    return (
        <div>
            <RedTriangle></RedTriangle>

            <ColoredTriangle></ColoredTriangle>

            <RotatingTriangle></RotatingTriangle>

            <Cube></Cube>
        </div>
    )
}
