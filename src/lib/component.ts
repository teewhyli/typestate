import { ComponentData } from '../types/State.type';

export abstract class Component {
    protected element: Element;

    constructor(props: ComponentData) {
        this.element = props.element;
    }
}