import { Button } from 'app/components/button';
import { Input, ItemWrapper, Label, TextArea } from 'app/components/form';

interface RenderFormControlsProps {
	input: any;
}

export const RenderFormControls = ({ input }: RenderFormControlsProps) => {
	const getFormControls = input.map((field) => {
		switch (field._type) {
			case 'input':
				return (
					<ItemWrapper key={field._key}>
						<Label>{field.label}</Label>
						<Input
							placeholder={field.placeholder}
							type={field.type}
							name={field.name}
						/>
					</ItemWrapper>
				);
			case 'textarea':
				return (
					<ItemWrapper key={field._key}>
						<Label>{field.label}</Label>
						<TextArea
							placeholder={field.placeholder}
							name={field.name}
							rows={5}
						/>
					</ItemWrapper>
				);
			case 'submit':
				return (
					<Button
						key={field._key}
						type="submit"
						variant="primary"
						size="default"
					>
						{field.text}
					</Button>
				);
		}
	});

	return <>{getFormControls}</>;
};
