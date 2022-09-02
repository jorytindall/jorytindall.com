// Import modules

import { RichText } from 'components/rich-text';
import { Form, Input, Label, TextArea, ItemWrapper } from 'components/form';
import { Container } from 'components/layout';

interface ModuleRendererProps {
    modules?: any,
}

export const ModuleRenderer = ({ modules }: ModuleRendererProps) => {
    const module = modules.map((m) => {
        switch (m._type) {
            case 'richText': return (
                <RichText value={m} key={m._key} />
            );
            case 'form': return (
                <Form key={m._key} name={m.name} method={m.method}>
                    <p>Form items go here.</p>
                </Form>
            );
            case 'fullWidthImage': return <p> key={m._key}Full width image here</p>
            case 'gallery': return <p key={m._key}>Gallery here</p>
            case 'hero': return <p key={m._key}>Hero here</p>
            case 'portfolioList': return <p key={m._key}>Portfolio list here</p>
            case 'results': return <p key={m._key}>Results here</p>
            case 'features': return <p key={m._key}>Features here</p>
            default: return <p key={m._key}>Nothing came back :(</p>
        }
    })

    return <>{module}</>
}