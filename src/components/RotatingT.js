import React, { useEffect, useRef } from 'react';
import { glMatrix, mat4 } from '../assets/gl-matrix';

export const RotatingT = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 0.15;
		canvas.heigh = window.innerHeight;

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

        var triangleVertices = [
            // X, Y, Z       R, G, B
            0.0, 0.5, 0.0, 1.0, 1.0, 0.0,
            -0.5, -0.5, 0.0, 0.7, 0.0, 1.0,
            0.5, -0.5, 0.0, 0.1, 1.0, 0.6
        ];

        var triangleVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

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
        mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);

        //vertical field of view in radians, aspect ratio width/height, what is the nearest point, what is the most far point
        mat4.perspective(projectionMatrix, glMatrix.toRadian(45), canvas.width / canvas.heigh, 0.1, 1000.0);

        //gl.FALSE not transposed matrix
        gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, rotationMatrix);
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
        gl.uniformMatrix4fv(matProjectionUniformLocation, gl.FALSE, projectionMatrix);

        //main render loop
        var identityMatrix = new Float32Array(16);
        mat4.identity(identityMatrix);
        var angle = 0;
        var loop = function () {
            angle = performance.now() * 0.001 * 2 * Math.PI;
            mat4.rotate(rotationMatrix, identityMatrix, angle, [0, 1, 0]);
            gl.uniformMatrix4fv(matRotationUniformLocation, gl.FALSE, rotationMatrix);

            gl.clearColor(0.75, 0.85, 0.8, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

    }, []);
    return <canvas ref={canvasRef} style={{ "height": "30%", "width": "30%" }} />;
};