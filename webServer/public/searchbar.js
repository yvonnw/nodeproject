ReactDOM.render(        
  <form id="searchform" name="form3" method="post" action="/searchStoryTask">
  <label>
  <input type="text" id="searchbox" name="searchbox" size="40"/>
  </label>
  <label>
  <input type="submit" name="Submit" value="Search"/>
  </label>
  </form>,
  document.getElementById('searchBar')
);