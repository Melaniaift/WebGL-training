import React, { useEffect, useRef } from 'react';
import { glMatrix, mat4 } from 'gl-matrix';

export const Cube = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 0.1;
        canvas.heigh = window.innerHeight * 0.3;

        const gl = canvas.getContext('webgl');

        // Vertex shader code
        // vec3 position is an output vector of 3 components
        //gl_Position is an output vector of 4 components (a matrix)
        const vertexShaderText = `
			attribute vec3 position;
            attribute vec3 vertColor;
            varying vec3 fragColor;
            uniform mat4 matrixRotation;
            uniform mat4 matrixView;
            uniform mat4 matrixProjection;
			
			void main() {
                fragColor = vertColor;
				gl_Position = matrixProjection * matrixView * matrixRotation * vec4(position, 1);
			}
		`;

        // Fragment shader code 1 = opaque
        const fragmentShaderText = `
			precision mediump float;
            varying vec3 fragColor;

			void main() {
				gl_FragColor = vec4(fragColor, 1); // Red color
			}
		`;

        gl.clearColor(0.75, 0.85, 0.8, 1.0);

        // let's clear the color buffer (what color the pixels should be) 
        //and depth buffer (how deep the pixels should be in the screen)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // show the closest face 
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);

        //vertex&fragment shader for drawing
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        // get the source code for the two shaders created previously
        gl.shaderSource(vertexShader, vertexShaderText);
        gl.shaderSource(fragmentShader, fragmentShaderText);

        //compile the shaders
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);

        // Create the shader program
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        //compiling
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('ERROR linking program', gl.getProgramInfoLog(program));
            return;
        }

        //important for testing
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program', gl.getProgramInfoLog(program));
            return;
        }

        var boxVertices =
            [ // X, Y, Z           R, G, B
                // Top
                -1.0, 1.0, -1.0, 0.5, 0.5, 0.5,
                -1.0, 1.0, 1.0, 0.5, 0.5, 0.5,
                1.0, 1.0, 1.0, 0.5, 0.5, 0.5,
                1.0, 1.0, -1.0, 0.5, 0.5, 0.5,

                // Left
                -1.0, 1.0, 1.0, 0.75, 0.25, 0.5,
                -1.0, -1.0, 1.0, 0.75, 0.25, 0.5,
                -1.0, -1.0, -1.0, 0.75, 0.25, 0.5,
                -1.0, 1.0, -1.0, 0.75, 0.25, 0.5,

                // Right
                1.0, 1.0, 1.0, 0.25, 0.25, 0.75,
                1.0, -1.0, 1.0, 0.25, 0.25, 0.75,
                1.0, -1.0, -1.0, 0.25, 0.25, 0.75,
                1.0, 1.0, -1.0, 0.25, 0.25, 0.75,

                // Front
                1.0, 1.0, 1.0, 1.0, 0.0, 0.15,
                1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
                -1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
                -1.0, 1.0, 1.0, 1.0, 0.0, 0.15,

                // Back
                1.0, 1.0, -1.0, 0.0, 1.0, 0.15,
                1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
                -1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
                -1.0, 1.0, -1.0, 0.0, 1.0, 0.15,

                // Bottom
                -1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
                -1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
                1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
                1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
            ];

        var boxIndices =
            [
                // Top
                0, 1, 2,
                0, 2, 3,

                // Left
                5, 4, 6,
                6, 4, 7,

                // Right
                8, 9, 10,
                8, 10, 11,

                // Front
                13, 12, 14,
                15, 14, 12,

                // Back
                16, 17, 18,
                16, 18, 19,

                // Bottom
                21, 20, 22,
                22, 20, 23
            ];

        var boxVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

        var boxIndexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

        // get the attribute location from vertexShaderText
        var positionAttribute = gl.getAttribLocation(program, 'position');
        var colorAttribute = gl.getAttribLocation(program, 'vertColor');

        //graphics card needs this info
        gl.vertexAttribPointer(
            positionAttribute, //attribute location
            3, //number of elements per attribute
            gl.FLOAT, //type of elements
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT, //size of an individual vertex
            0 //offset from the beginning of a single vertex to this attribute
        );

        gl.vertexAttribPointer(
            colorAttribute, //attribute location
            3, //number of elements per attribute
            gl.FLOAT, //type of elements
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT, //size of an individual vertex
            3 * Float32Array.BYTES_PER_ELEMENT //offset from the beginning of a single vertex to this attribute
        );

        gl.enableVertexAttribArray(positionAttribute);
        gl.enableVertexAttribArray(colorAttribute);

        //tell OpenGL state machine which program should be active 
        gl.useProgram(program);

        var matRotationUniformLocation = gl.getUniformLocation(program, 'matrixRotation');
        var matViewUniformLocation = gl.getUniformLocation(program, 'matrixView');
        var matProjectionUniformLocation = gl.getUniformLocation(program, 'matrixProjection');

        var rotationMatrix = new Float32Array(16);
        var viewMatrix = new Float32Array(16);
        var projectionMatrix = new Float32Array(16);

        //identity matrix
        mat4.identity(rotationMatrix);

        //eye position, focal point, up axis
        mat4.lookAt(viewMatrix, [0, 0, -10], [0, 0, 0], [0, 1, 0]);

        //vertical field of view in radians, aspect ratio width/height, what is the nearest point, what is the most far point
        mat4.perspective(projectionMatrix, glMatrix.toRadian(45), canvas.width / canvas.heigh, 0.1, 1000.0);

        //gl.FALSE not transposed matrix
        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, rotationMatrix);
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
        gl.uniformMatrix4fv(matProjectionUniformLocation, gl.FALSE, projectionMatrix);

        //oblic rotation
        var xRotationMatrix = new Float32Array(16);
        var yRotationMatrix = new Float32Array(16);

        // mat4.identity(xRotationMatrix);
        // mat4.identity(yRotationMatrix);

        //main render loop
        var identityMatrix = new Float32Array(16);
        mat4.identity(identityMatrix);
        var angle = 0;
        var loop = function () {
            angle = performance.now() * 0.001 * Math.PI;
            mat4.rotate(rotationMatrix, identityMatrix, angle, [0, 1, 0]);
            mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
            mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
            mat4.mul(rotationMatrix, yRotationMatrix, xRotationMatrix);

            gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, rotationMatrix);

            gl.clearColor(0.75, 0.85, 0.8, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

    }, []);
    return <canvas ref={canvasRef} style={{ "width": "50%", "height": "70%", }} />;
};
