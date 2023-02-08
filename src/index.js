"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");
var getComponentPath = require('./getComponentPath').default;
var _core = require("@babel/core");

const DEFAULT_TRACE_ID = "__source";
const DEFAULT_PATHS = ["src/components"];
const IGNORE_PATHS = [];
const DEFAULT_PREFIX = "";
const FILE_NAME_VAR = "_componentFileName";

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);

  const visitor = {
    JSXOpeningElement(path, state) {
      const traceID = state.opts.traceId || DEFAULT_TRACE_ID
      const paths = state.opts.paths || DEFAULT_PATHS
      const ignorePaths = state.opts.ignorePaths || IGNORE_PATHS
      const prefix = state.opts.prefix || DEFAULT_PREFIX
      const id = _core.types.jsxIdentifier(traceID);
      const attributes = path.container.openingElement.attributes;

      for (let i = 0; i < attributes.length; i++) {
        const name = attributes[i].name;

        if ((name == null ? void 0 : name.name) === traceID) {
          return;
        }
      }

      if (!state.componentFileName) {
        const componentFileName = state.filename ? getComponentPath(state.filename, paths, prefix, ignorePaths) : "";
        const componentFileNameIdentifier = path.scope.generateUidIdentifier(
          FILE_NAME_VAR,
        );

        const scope = path.hub.getScope();

        if (!scope || !componentFileName) {
          return
        }

        scope.push({
          id: componentFileNameIdentifier,
          init: _core.types.stringLiteral(componentFileName),
        });


        state.componentFileName = componentFileNameIdentifier;
      }

      const componentFileNameProperty = _core.types.objectProperty(
        _core.types.identifier("name"),
        state.componentFileName
      );

      const propsLiteral = _core.types.identifier("props");
      const parentPropsProperty = _core.types.objectProperty(_core.types.identifier("parentProps"),
        path.scope.hasBinding('props') ? propsLiteral : _core.types.nullLiteral()
      );

      attributes.push(_core.types.jsxAttribute(id,
        _core.types.jsxExpressionContainer(_core.types.objectExpression([parentPropsProperty, componentFileNameProperty]))
      ));
    }

  };
  return {
    name: "transform-react-jsx-source",
    visitor
  };
});

exports.default = _default;
