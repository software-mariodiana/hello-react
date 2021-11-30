# Refactoring CSS in React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and then tweaked to use JavaScript objects for CSS.

## Overview

I wanted to take the basic "Hello World" app that's created from the `create-react-app` command and convert the CSS from an external file to component-based JavaScript objects. 

That was easy enough regarding the plain selectors, but the default app uses at-selectors for animation styling. The problem with that is you can't name a JavaScript property with an at-sign. Doing so throws an "Invalid or unexpected token" error.

To get around that limitation, you can wrap the CSS animation rules in a string and place it all in a `style` element. But proper HTML asks that `style` elements reside only in the document's `head` element, rather than in the body. I wanted a solution that takes all of that into account.

The solution uses custom hooks.

### The useAnimation hook

The hook, `useAnimation` can be found in the `custom-css-animations.js` file. Its signature looks like this:

```
function useAnimation(rules) { 
  /* Do the needful! */ 
};
```

It builds on the standard `useEffect` hook to add the `style` element defining the animation to the document's `head` when the component is mounted, removing it on unmount:

```
useEffect(() => {
  const style = addAnimation();

  return () => {
    document.head.removeChild(style);
  }

}, [addAnimation]);
  ```
In the above, `addAnimation` is a memoized function created with the `useCallback` hook. We memoize the function to keep from triggering our `useEffect` hook every time the component updates. (We want it to run only only when the component mounts and unmounts.) 

The function we memoize does the work of building the `style` element and adding it to the document's `head`.

Take a look at `custom-css-animations.js` to see how it all works.

### Using the hook

In this example project we create only one animation, but the `useAnimation` hook is meant as a building block for individual animations, which are implemented with their own hooks. In our case, we create a `useLinearSpinAnimation` hook, building on `useAnimation` to re-implement the animation from the `create-react-app` default project.

That hook can be found in the `Animation.js` file, and has a signature like this:

```
function useLinearSpinAnimation({className, duration}) {
  /* Implement the CSS rules as a string. */
}
```

In this hook, we implement the `@media` and `@keyframes` selectors within a string. The two arguments, `className` and `duration`, gives us some flexibility. Refer to the `Animation.js` file for details.

The hook is then called from the `App.js` file, like so:

```
useLinearSpinAnimation({ className: 'App-logo', duration: 20 });
```

The `className` here matches the corresponding property of the `img` element we're animating:

```
<img src={logo} 
     className="App-logo"
     style={styles.appLogo} 
     alt="logo" />
```

The result, in my opinion, is a cleaner way of using at-selectors in React components.

###### Touched: 2021-11-29, Mario Diana
