const fs = require('fs');
const babylon = require('babylon')
const traverse = require('babel-traverse').default;
// const { create } = require('lodash');
const path = require('path');
const babel = require('babel-core');



let ID = 0;
function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');

    const ast = babylon.parse(content, {
        sourceType: "module"
    })

    const dependencies = [];
    traverse(ast, {
        ImportDeclaration: ({node}) => {
            // console.log(node)
            dependencies.push(node.source.value)
        }
    })

    const id = ID++;

    const { code } = babel.transformFromAst(ast, null, {
        presets: ['env']
    })

    return {
        id,
        filename,
        dependencies,
        code
    }
}

function createGraph(entry) {
    const mainAsset = createAsset(entry);
    const allAsset = [mainAsset];

    for ( let asset of allAsset) {
        const dirname = path.dirname(asset.filename);
        
        asset.mapping = {};

        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);

            const childAsset = createAsset(absolutePath);

            asset.mapping[relativePath] = childAsset.id;

            allAsset.push(childAsset);// 快遍历后就推入新依赖
        })
    }

    return allAsset;
}

function bundle(graph) {
    let modules = '';

    graph.forEach(module => {
        modules += `${module.id}:[
            function(require, module, exports) {
                ${module.code}
            },
            ${JSON.stringify(module.mapping)},
        ],`
    });
    const result = `
        (function(modules){
            function require(id) {
                const [fn, mapping] = modules[id]

                function localRequire(relativePath) {
                    return require(mapping[relativePath]);
                }

                const module = {exports: {}};
                fn(localRequire, module, module.exports);

                return module.exports;
            }
            require(0);
        })({${modules}})
    `;
    return result;
}

const graph = createGraph('./source/entry.js');
// console.log(graph)
const result = bundle(graph);

console.log(result)