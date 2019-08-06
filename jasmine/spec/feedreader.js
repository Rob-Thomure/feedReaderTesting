/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* 
 * All tests are placed within the $() function, to ensure they
 * don't run until the DOM is ready.
 */
$(function() {
    // Test suite for the RSS feeds, the allFeeds variable in the app
    describe('RSS Feeds', function() {
        it('are defined', function() {
            // tests to make sure allFeeds variable defined
            expect(allFeeds).toBeDefined();
            // tests to make sure allFeeds is not empty
            expect(allFeeds.length).not.toBe(0);
        });
        it('URLs of allFeeds are defined', function() {
            // loops through each feed in allFeeds object
            allFeeds.forEach(function(eachFeed) {
                // tests if url is defined
                expect(eachFeed.url).toBeDefined();
                // tests to ensure url is not empty
                expect(eachFeed.url.length).not.toBe(0);
            });
        });
        it('names of allFeeds are defined', function() {
            // loops through each feed in allFeeds object
            allFeeds.forEach(function(eachFeed) {
                // tests if name is defined
                expect(eachFeed.name).toBeDefined();
                // tests to ensure name is not empty
                expect(eachFeed.name.length).not.toBe(0);
            });
        });
    });
    // test suite for the menu
    describe('The menu', function() {
        // test to ensure the menu element is hidden by default.
        it('the menu is hidden by default', function() {
            expect(document.querySelector('body').classList).toContain
            ('menu-hidden');
        })
        // tests to ensure menu changes visibility when menu icon is clicked
        it('the menu changes visibility when clicked', function() {
            // save menu icon of the DOM as a variable menuIcon
            const menuIcon = document.querySelector('.menu-icon-link');
            // simulates mouse click on the menu icon
            menuIcon.click();
            // tests to ensure menu element is visible
            expect(document.querySelector('body').classList).not.toContain
            ('menu-hidden');
            // simulates mouse click on the menu icon
            menuIcon.click();
            // tests to ensure menu element is hidden
            expect(document.querySelector('body').classList).toContain
            ('menu-hidden');                        
        });        
    });
    // tests suite for the initial entries of the loadFeed function
    describe('Initial Entries', function() {
        // instructions to wait for loadFeed() to complete due to asynchronous
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        // tests to ensure there is at least 1 .entry-link element within .feed
        it('check for an entry-link element loaded', function() {
            expect(document.querySelector('.feed .entry-link')).toBeDefined();
        });
    });
    // test suite to ensure loadFeed content changes
    describe('New Feed Selection', function() {
        let loadFeed1;
        let loadFeed2;
        // instructs jasmine to wait for asynchronous functions to load
        beforeEach(function (done) {
            // call loadFeed(1)
            loadFeed(1, function () {
                // saves html results of loadFeed(1)
                loadFeed1 = document.querySelector('.feed').innerHTML;
                // loadFeed(0)
                loadFeed(0, function() {
                    // saves html results of loadFeed(0)
                    loadFeed2 = document.querySelector('.feed').innerHTML;
                    done();
                })
            });
        });
        // tests to ensure the 2 loadFeeds are different
        it('loadFeed1 matches loadFeed2', function () {
            expect(loadFeed1).not.toEqual(loadFeed2);
        })
    });
}());