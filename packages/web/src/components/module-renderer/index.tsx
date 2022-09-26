import { RichText } from 'components/rich-text';
import { Form, Input, Label, TextArea, ItemWrapper } from 'components/form';
import { RichTextWrapper, GridWrapper } from 'components/layout';
import { Features } from 'components/features'

interface ModuleRendererProps {
    modules?: any,
}

export const ModuleRenderer = ({ modules }: ModuleRendererProps) => {
    const getModule = modules.map((m) => {
        switch (m._type) {
            case 'richText': return (
                <RichTextWrapper key={m._key}>
                    <RichText value={m.content} />
                </RichTextWrapper>
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
            case 'features': return <Features input={m} key={m._key} />
            default: return console.error('Nothing came back for this module')
        }
    })

    return <GridWrapper>{getModule}</GridWrapper>
}