const fs = require('fs');
const path = require('path');
const docgen = require('react-docgen-typescript');

const DOCGEN_PATH = 'docgen';
const SRC_PATH = 'src';

try {
  fs.rmSync(DOCGEN_PATH, { recursive: true });
} catch {
  // do nothing
}

fs.mkdirSync(DOCGEN_PATH);

const generateDoc = fileName => {
  const docs = docgen.parse(path.resolve(SRC_PATH, `${fileName}.ts`), {
    savePropValueAsString: true,
    shouldIncludePropTagMap: true,
  });
  const { props, description } = docs[0];
  const argTypes = {};
  Object.values(props).forEach(prop => {
    argTypes[prop.name] = {
      control: prop.type.name.startsWith('(') || prop.name === 'children' ? false : null,
      name: prop.name,
      description: prop.description,
      type: {
        ...prop.type,
        required: !!prop.required,
      },
      table: {
        defaultValue: prop.defaultValue && { summary: prop.defaultValue.value },
      },
    };
  });
  fs.writeFileSync(
    path.resolve(DOCGEN_PATH, `${fileName}.json`),
    JSON.stringify({ description, argTypes }, null, '  '),
  );
};

generateDoc('Transition');
generateDoc('CSSTransition');
generateDoc('StyleTransition');
generateDoc('TransitionGroup');
