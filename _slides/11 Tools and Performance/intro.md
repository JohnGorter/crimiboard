# Performance and Tooling

---
### Performance and Tooling
React tries to perform at best by
- minimizing the DOM operations

* You need to know how the reconciliation process works

React provides tools to
- inspect and finetune your application

* You need to know your application's bottlenecks

---
### Reconciliation process
Reconciliation process happens when state causes a component to re-render
When setState is called
- component is marked as 'dirty'
- changes do not effect immediately
- changes are batched and effected in next loop cycle
- DOM therefore only updated once per event loop cycle

---
### Subtree Rendering
Components marked 'dirty' cause subtree re-rendering
- All children of the 'dirty' component are re-rendered

* Sounds inefficient but actually fast because React renders a in memory virtual DOM

You can prevent a child from re-rendering when necessary
- shouldComponentUpdate is called before re-rendering
- gives you an option to performance tune rendering
- occasionally needed

* Prevent premature optimisation with 'shouldComponentUpdate' because
    - code gets more complicated
    - it can lead to hard to track bugs


