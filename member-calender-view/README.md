<<<<<<< HEAD
# Building a UI from scratch, based on a design with ReactJS

In this article we will build a UI following a design. We will use `Figma` to visualize the design, but is also possible to use any other tool that allow you to extract the CSS code from the elements, such as `invisionapp`, `zeplin`, etc.


### Creating the app
For this step we will use [Create React App]
```
npx create-react-app (Project Name)
```

We will use [aphrodite](https://www.npmjs.com/package/aphrodite) for the styles and [simple-flexbox](https://www.npmjs.com/package/simple-flexbox) to make the layout.

`yarn add aphrodite simple-flexbox` or `npm install aphrodite simple-flexbox`

### Folder structure:
For this case we can keep a simple structure:
```
/src
    /assets
    /components
    App.js
```

## Let's do it
We are ready to start, first we need to identify the main blocks of the design. I have decided to split it into 4 main blocks as follows:
```
1- Sidebar
2- Main Block
    3- Header
    4- Content
```

### Sidebar
We can split the Sidebar in 2 parts, `Logo` block, and `MenuItem` list.
We need 3 components for this:
```
1- SidebarComponent
    2- LogoComponent
    3- MenuItemComponent (list)
```

<img src="https://i.postimg.cc/qvppNWGb/screenshot2.png" height="500">

**We will start defining the Logo and Menu Items**

#### LogoComponent.js
First we need to download the Logo (double click on the logo, go to the `Design` tab and click on export button bellow). I downloaded it in `svg` format and imported it as a React Component.

`LogoComponent.js` is a `Row` centered vertically and horizontally, with the `Logo` and the `title`.

```
<Row className={css(styles.container)} horizontal="center" vertical="center">
    <Logo />
    <span className={css(styles.title)}>Dashboard Kit</span>
</Row>
```

For styles, we need to import `Muli` font family, the easy way is include this line in [App.css](https://github.com/llorentegerman/react-admin-dashboard/blob/master/src/App.css) (we can remove the rest of the content, we don't need it):

```
@import url('https://fonts.googleapis.com/css?family=Muli');
```

These are the styles for `container` and `title`

```javascript
container: {
    marginLeft: 32,
    marginRight: 32
},
title: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: '24px',
    letterSpacing: '0.4px',
    color: '#A4A6B3',
    opacity: 0.7,
    marginLeft: 12 // <--- necessary to separate title and logo
}
```

#### MenuItemComponent.js
It represents an item of the menu, it's composed by an `icon`, a `title` and has different styles depending of its own state (`active`, `unactive`, `hover`). If it's active, has a white bar at the left.

```
<Row className={css(styles.container, active && styles.activeContainer)} vertical="center">
    {active && <div className={css(styles.activeBar)}></div>}
    <Icon fill={active && "#DDE2FF"} opacity={!active && "0.4"} />
    <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
</Row>
```

As you can see, there are some special styles depending on `active` property, for example the `title` has a different color when `active` is `true`. For the icons, default fill is `#9FA2B4` and default opacity is `1`, these values change depending on the state of the above mentioned property.
A special element that appears when the item is `active`, is that white bar on the left (`activeBar`).

These are the styles:
```javascript
activeBar: {
    height: 56,
    width: 3,
    backgroundColor: '#DDE2FF',
    position: 'absolute',
    left: 0
},
activeContainer: {
    backgroundColor: 'rgba(221,226,255, 0.08)'
},
activeTitle: {
    color: '#DDE2FF'
},
container: {
    height: 56,
    cursor: 'pointer',
    ':hover': {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    paddingLeft: 32,
    paddingRight: 32
},
title: {
    fontFamily: 'Muli',
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '0.2px',
    color: '#A4A6B3',
    marginLeft: 24
}
```

#### SidebarComponent.js
As we did with the Logo, we need to download the icons that we will use in this component, it's possible do it from the design or you can copy them from the folder `assets` of the repository doing [click here](https://github.com/llorentegerman/react-admin-dashboard/tree/master/src/assets).
```
...
import IconOverview from '../../assets/icon-overview.js';
...
<Column className={css(styles.container)}>
    <LogoComponent />
    <Column className={css(styles.menuItemList)}>
        <MenuItemComponent title="Overview" icon={IconOverview} />
    </Column>
</Column>
```

Based on `css` extracted from the design, we can define the styles with these 3 classes:
```javascript
container: {
    backgroundColor: '#363740',
    width: 255,
    paddingTop: 32
},
menuItemList: {
    marginTop: 52
},
separator: {
    borderTop: '1px solid #DFE0EB',
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.06
}
```

`SidebarComponent` is ready, in the repository I have added some `onClick` events and a `state` to do it interactive, so you can select the differents menu items.

### MainComponent (App.js)
Now we only need to work in `App.js`, as we said, has the following structure:
```
1- Sidebar
2- Main Block
    3- Header
    4- Content
```

It can be defined as follows:
```
<Row className={css(styles.container)}>
    <SidebarComponent />
    <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Title" />
        <div className={css(styles.content)}>
            <span>Content</span>
        </div>
    </Column>
</Row>
```

Styles:

```javascript
container: {
    height: '100vh' // menu has to take all the height of the screen
},
content: {
    marginTop: 54
},
mainBlock: {
    backgroundColor: '#F7F8FC',
    padding: 30
}
```

#### HeaderComponent.js
To finish, we will define the Header, with the following structure.
```
1- Row ({ vertical: center, horizontal: space-between })
    2- Title
    3- Row ({ vertical: center })
        4- Icons
        5- Separator
        6- Row ({ vertical: center })
            7- Name
            8- Avatar
```

```
<Row className={css(styles.container)} vertical="center" horizontal="space-between">
    <span className={css(styles.title)}>{title}</span>
    <Row vertical="center">
        <div className={css(styles.cursorPointer)}>
            <IconSearch />
        </div>
        <div style={{ marginLeft: 25 }} className={css(styles.cursorPointer)}>
            <IconBellNew />
        </div>
        <div className={css(styles.separator)}></div>
        <Row vertical="center">
            <span className={css(styles.name, styles.cursorPointer)}>Germán Llorente</span>
            <img src="https://avatars3.githubusercontent.com/u/21162888?s=460&v=4" alt="avatar" className={css(styles.avatar, styles.cursorPointer)} />
        </Row>
    </Row>
</Row>
```

Header styles:

```javascript
avatar: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 14,
    border: '1px solid #DFE0EB',
},
container: {
    height: 40
},
cursorPointer: {
    cursor: 'pointer'
},
name: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'right',
    letterSpacing: 0.2
},
separator: {
    borderLeft: '1px solid #DFE0EB',
    marginLeft: 32,
    marginRight: 32,
    height: 32,
    width: 2
},
title: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: '30px',
    letterSpacing: 0.3
}
```
#### COntent.js
This is a Landing Page of the App.

```
1. Displays the Members From Mock Api http://localhost:3000/members
2.Once the Member is clicked a calender view is displayed with respective working hrs of a member from API 
```
=======
# member-calender-view
Members Details fetched from Api
>>>>>>> c30aa852019932c4cf4c03e3d108da64527dc4aa
