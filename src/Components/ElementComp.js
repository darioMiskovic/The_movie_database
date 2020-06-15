//Attribute
export class CreateAttribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

//Create Element
export class CreateElement {
  //   constructor(elSelector) {
  //     this.elSelector = elSelector;
  //   }

  renderElement(tag, clsName, attribute) {
    const element = document.createElement(tag);

    if (clsName) {
      element.className = clsName;
    }

    if (attribute && attribute.length > 0) {
      attribute.forEach((attr) => {
        element.setAttribute(attr.name, attr.value);
      });
    }

    return element;
  }
}
