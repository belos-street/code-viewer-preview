import{_ as a}from"./code-viewer.vue_vue_type_script_setup_true_lang-DmCRNCzt.js";/* empty css               */import{d as r,c as i,o as c,a as t,b as m,u as n}from"./index-Dhdpvayi.js";const l=`// 简单代码示例
const greet = (name: string) => {
  console.log(\`Hello, \${name}!\`);
};

greet("World");

// This is a comment line with some extra long text to test wrapping and overflow behavior. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

function anotherExample() {
  return true;
}`,d={class:"p-4"},p={class:"h-80 border border-gray-200"},x=r({__name:"simple-code-demo",setup(u){const s=l.split(`
`).map((o,e)=>({id:`line${e+1}`,content:o}));return(o,e)=>(c(),i("div",d,[e[0]||(e[0]=t("div",{class:"mb-4"},[t("h3",{class:"text-lg font-medium text-gray-800 mb-2"},"简单代码渲染"),t("p",{class:"text-sm text-gray-600"},"这个示例展示了基本的代码渲染功能，没有使用任何插件。")],-1)),t("div",p,[m(n(a),{code:n(s)},null,8,["code"])])]))}});export{x as default};
