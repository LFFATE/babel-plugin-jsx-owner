"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _core = require("@babel/core");

const TRACE_ID = "__source";
const FILE_NAME_VAR = "_componentFileName";

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);

  const visitor = {
    JSXOpeningElement(path, state) {

      const id = _core.types.jsxIdentifier(TRACE_ID);
      const attributes = path.container.openingElement.attributes;

      for (let i = 0; i < attributes.length; i++) {
        const name = attributes[i].name;

        if ((name == null ? void 0 : name.name) === TRACE_ID) {
          return;
        }
      }

      if (!state.componentFileName) {
        const componentFileName = state.filename ? getComponentPath(state.filename): "";
        const componentFileNameIdentifier = path.scope.generateUidIdentifier(
          FILE_NAME_VAR,
        );

        const scope = path.hub.getScope();
        if (scope) {
          scope.push({
            id: componentFileNameIdentifier,
            init: _core.types.stringLiteral(componentFileName),
          });
        }

        state.componentFileName = componentFileNameIdentifier;
      }

      const componentFileNameProperty = _core.types.objectProperty(
        _core.types.identifier("name"),
        state.componentFileName
      );

      const propsLiteral = _core.types.identifier("props");
      const parentPropsProperty = _core.types.objectProperty(_core.types.identifier("parentProps"),
        path.scope.bindings.props ? propsLiteral : _core.types.nullLiteral()
      );

      attributes.push(_core.types.jsxAttribute(id,
        _core.types.jsxExpressionContainer(_core.types.objectExpression([ parentPropsProperty, componentFileNameProperty ]))
      ));
    }

  };
  return {
    name: "transform-react-jsx-source",
    visitor
  };
});

const replaceSlashes = (path) => {

  return path.replace(/\\/g, '/')
}

const getComponentPath = (path) => {
  const normalizedPath = replaceSlashes(path);
  const matches = normalizedPath.match(/src\/components\/(.*)\.tsx/ui);

  return matches ? matches[1] : "";
}

exports.default = _default;
