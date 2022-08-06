import React from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Submit from './Submit';
import styled from 'styled-components';

import { Container } from '../layout';

export function Form({ input }) {
	const renderFields = input.fields.map((field) => {
		switch (field._type) {
			case `input`:
				return (
					<Input
						label={field.label}
						type={field.type}
						placeholder={field.placeholder}
						key={field._key}
					/>
				);
			case `textarea`:
				return (
					<Textarea
						name={field.name}
						label={field.label}
						placeholder={field.placeholder}
						key={field._key}
					/>
				);
			case `submit`:
				return <Submit text={field.text} key={field._key} />;
			default:
				return null;
		}
	});

	return (
		<Container>
			<Wrapper
				name={input.title}
				method={input.method}
				data-netlify={input.netlify}
				netlify
				action={`/${input.action.slug.current}`}
			>
				<input type="hidden" name="form-name" value={input.title} />
				{renderFields}
			</Wrapper>
		</Container>
	);
}

const Wrapper = styled.form`
	padding: 2.5rem 0;
`;
