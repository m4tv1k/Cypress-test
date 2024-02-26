describe("Тестируем приложение", () => {

const userEmail = 'matviklet@gmail.com'
const userPass = '3628966Yy'

    beforeEach(() => {
        cy.visit('https://unsplash.com')

        
    })

    Cypress.Commands.add('login', () => {
        cy.contains('Log in').click()
        cy.get('input[type="email"]').type(`${userEmail}`)
        cy.get('input[type="password"]').type(`${userPass}`)
        cy.get('button[value="Login"]').click()
        
    })

    it('log-in-error', () => {
        cy.contains('Log in').click()
        cy.get('input[type="email"]').type('admin@gmail.com')
        cy.get('input[type="password"]').type('admin')
        cy.get('button[value="Login"]').click()
        cy.contains('Invalid email or password.').should('exist')
        cy.get('button[class="yAKos jpBZ0"]').click()
        cy.get('a[title="Home — Unsplash"]').click()
    });

   
    it('searching', () => {
        cy.get('[data-test="nav-bar-search-form-input"]').type('kittens{enter}')
        cy.get('[data-test="page-header-title"]').should('have.text','Kittens')
        cy.get('[data-test="search-photos-route"] img').should('exist')
        cy.get('button[type="reset"]').click()
        cy.get('[data-test="nav-bar-search-form-input"]').should('not.have.text')
        cy.get('button[title="Visual search"]').click()
        cy.get('input[id="visual-search-form-dropbox-input"]').type('https://i.pinimg.com/originals/c6/67/9f/c6679f463f4c81c71b7e4d5e39c834a1.jpg ')
        cy.get('.HQ7u4 button').first().click()
        cy.get('div[class="MorZF"]').should('exist')
        cy.get('a[title="Home — Unsplash"]').click()
    });

    it('log-in', () => {
   
        cy.contains('Log in').click()
        cy.get('input[type="email"]').type(`${userEmail}`)
        cy.get('input[type="password"]').type(`${userPass}`)
        cy.get('button[value="Login"]').click()
        cy.get('button[title="Your personal menu button"]').click()
        cy.contains('View profile').click()
        cy.get('[data-test="users-route"]').should('exist')
        cy.contains('Matvey Yakimov').should('exist')
        cy.get('a[title="Home — Unsplash"]').click()
 
    });

    it('download-and-check-info', () => {
        cy.login()
        cy.get('[data-test="photo-grid-masonry-figure"]').first().click()
        cy.wait(1500)
        // cy.get('span[class="TaWJf"]').click()
        // cy.contains('Say thanks!').should('exist')
        // cy.get('button[class="OEI2b jpBZ0"]').click()
        cy.wait(4000)
        cy.get('div[class="TO_TN"]').click()
        cy.wait(500)
        cy.get('div[id="popover-more-actions-dropdown"] button').first().click()
        cy.wait(200)
        cy.contains('Share profile').click()
        cy.wait(700)
        cy.get('button[aria-label="Copy to clipboard"]').click()
        cy.wait(500)
        cy.get('button[class="fdrIK jpBZ0 cIVI_"]').click()
        cy.wait(500)
        cy.get('div[id="popover-more-actions-dropdown"] button').first().click()
        cy.wait(200)
        cy.contains('Report').click()
        cy.wait(1000)
        cy.get('select').select(1)
        cy.wait(200)
        cy.get('textarea').type('Report reason is unreliable, this is only needed to test the web page')
        cy.wait(2000)
        cy.contains('Cancel').click()
        cy.contains('Likes').click()
        cy.contains('Collections').click()
        cy.get('[data-test="users-collections-route"] [data-test="collection-feed-card"] a').first().click()
        cy.get('[data-test="masonry-grid-count-three"] img').should('exist')
        cy.get('a[title="Home — Unsplash"]').click() 
    })
        
    it('add-to-likes', () => {
        cy.login()
        cy.get('[data-test="photo-grid-masonry-figure"]').first().click()
        cy.wait(4000)
        cy.get('header button[title="Like this image"]').click()
        cy.wait(500)
        cy.get('button[class="fdrIK jpBZ0 cIVI_"]').click()
        cy.get('button[title="Your personal menu button"]').click()
        cy.contains('View profile').click()
        cy.wait(300)
        cy.contains('Likes').click()
        cy.get('[data-test="users-likes-route"] [data-test="masonry-grid-count-three"]').get('figure[itemprop="image"]').should('exist')
        cy.get('[data-test="photo-grid-masonry-figure"] a').first().click()
        cy.get('header button[title="Like this image"]').click()
        cy.get('button[class="fdrIK jpBZ0 cIVI_"]').click()
        cy.get('a[title="Home — Unsplash"]').click() 
    });

    it('edit-profile', () => {
        cy.login()
        cy.get('button[title="Your personal menu button"]').click()
        cy.contains('View profile').click()
        cy.wait(300)
        cy.contains('Edit profile').click()
        cy.get('textarea[id="user_bio"]').type('my bio')
        cy.get('input[value="Update account"]').click()
        cy.get('a[class="flash__close link--no-underline js-close-flash"]').click()
        cy.get('a[id="user-dropdown"]').click()
        cy.contains('View profile').click()
        cy.contains('my bio').should('exist')
        cy.contains('Edit profile').click()
        cy.get('textarea[id="user_bio"]').clear()
        cy.get('input[value="Update account"]').click()
        cy.get('a[class="flash__close link--no-underline js-close-flash"]').click()
        cy.get('a[id="user-dropdown"]').click()
        cy.contains('View profile').click()
        cy.contains('my bio').should('not.exist')
        cy.get('a[id="user-dropdown"]').click()
        cy.contains('Logout').click()
    });
})