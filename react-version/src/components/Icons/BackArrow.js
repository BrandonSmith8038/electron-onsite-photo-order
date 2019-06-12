import React from 'react';
import { primary } from '../Colors.js';

const BackArrow = () => {
	return (
		<div>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='64'
				height='64'
				viewBox='0 0 40 40'
				aria-labelledby='title'
			>
				<title id='title'>Back Arrow</title>
				<path
					fill={primary}
					d='M 11 3 C 6.568 3 3 6.568 3 11 C 3 15.432 6.568 19 11 19 C 15.432 19 19 15.432 19 11 C 19 6.568 15.432 3 11 3 z M 11 4 C 14.878 4 18 7.122 18 11 C 18 14.878 14.878 18 11 18 C 7.122 18 4 14.878 4 11 C 4 7.122 7.122 4 11 4 z M 12.292969 7 L 9 10.292969 L 8.2929688 11 L 9 11.707031 L 12.292969 15 L 13 14.292969 L 9.7070312 11 L 13 7.7070312 L 12.292969 7 z'
				/>
			</svg>
		</div>
	);
};

export default BackArrow;
