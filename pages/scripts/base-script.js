var headerMenuData =
    [
            {
                MenuItemName: "Home Page",
                MenuItemPath: "../pages/index.html"
            },
            {
                MenuItemName: "My Notes",
                MenuItemPath: "../pages/my-notes.html"
            },
            {
                MenuItemName: "Adding New Note",
                MenuItemPath: "../pages/add-note.html"
            },
            {
                MenuItemName: "About",
                MenuItemPath: "../pages/about.html"
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
        <h1>Personal TODO-List</h1>
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
          `};