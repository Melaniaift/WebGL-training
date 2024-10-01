import React, { useEffect, useRef } from 'react';

export const RedTriangle = () => {
	const canvasRef = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth * 0.15;
		canvas.heigh = window.innerHeight;

		const gl = canvas.getContext('webgl');
		// Vertex shader code
		// vec2 position is an output vector of 2 components
		//gl_Position is an output vector of 4 components
		const vertexShaderText = `
			attribute vec2 position;
			
			void main() {
				gl_Position = vec4(position, 0, 1);
			}
		`;

		// Fragment shader code 1, 0, 0, 1 = RED, NO GREEN, NO BLUE, NO TRANSPARENT
		const fragmentShaderText = `
			precision mediump float;
			void main() {
				gl_FragColor = vec4(1, 0, 0, 1); // Red color
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
			0.0, 0.5,
			-0.5, -0.5,
			0.5, -0.5
		];

		var triangleVertexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

		// get the attribute location from vertexShaderText
		var positionAttribute = gl.getAttribLocation(program, 'position');

		//graphics card needs this info
		gl.vertexAttribPointer(
			positionAttribute, //attribute location
			2, //number of elements per attribute
			gl.FLOAT, //type of elements
			gl.FALSE,
			2 * Float32Array.BYTES_PER_ELEMENT, //size of an individual vertex
			0 //offset frm the beginning of a single vertex to this attribute
		);

		gl.enableVertexAttribArray(positionAttribute);

		//main render loop
		gl.useProgram(program);

		//0 = how many vertices to skip
		//3 = how many vertices to draw
		gl.drawArrays(gl.TRIANGLES, 0, 3)
	}, []);
	return <canvas ref={canvasRef} style={{ "height": "30%", "width": "30%" }} />;
};

