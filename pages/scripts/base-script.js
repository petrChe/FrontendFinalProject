var headerMenuData =
    [
            {
                MenuItemName: "Home Page",
                MenuItemPath: "../pages/index.html"
            },
            {
                MenuItemName: "My Notes",
                MenuItemPath: "../pages/my-notes.html"
            }
    ];

        var headerMarkup = createHeader(headerMenuData);
        var headerContent = document.getElementById('header');
        headerContent.innerHTML = headerMarkup;

        var footerMarkup = createFooter();
        var footer = document.getElementById("footer");
        footer.innerHTML = footerMarkup;
        
    function createHeader(headerMenuItems) {
        return `
        <div class="logo">
            <p>TODO-List </p>
            <img class="logoImg" src="../pages/images/checkmark.png" alt="logo">
        </div>
        <nav>
        <ul>     
            ${headerMenuItems.map((menuItem, index) => 
              `
              <li><a href="${menuItem.MenuItemPath}">${menuItem.MenuItemName}</a></li>
              `
            ).join("")}
            </ul>
          </nav>
      `};

      function createFooter() {
          return `
          <address>https://github.com/petrChe</address>
          <p>&copy; 2018 petrChe</p>
          <p><a href="https://icons8.com">Icon pack by Icons8</a></p>
          <p><a href='https://www.freepik.com/free-vector/abstract-low-poly-mesh-background-design_1765628.htm'>Designed by Kjpargeter</a></p>  
          `};