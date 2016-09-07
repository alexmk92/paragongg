var Preloader = function() {

    this.loaded = false;
    this.preloaderNode = null;
    this.parentNode = null;

    this.attachToDOM = function() {
        this.createLoader();
        window.addEventListener("load", function(event) {
            this.loaded = true;
            this.removeLoader();
        }.bind(this));
    };

    this.createLoader = function() {
        this.parentNode = document.querySelector('body');
        var preloader = document.createElement('div');
        preloader.id = 'preloader';
        // Customise this as much as you like
        preloader.innerHTML += '<span>JAMIE DO YOUR STYLING! <i class="fa fa-spinner fa-spin"</span>';

        // Amend the timeout delay based on how long we want to wait before adding loader to the page.
        setTimeout(function() {
            if(!this.loaded) {
                this.preloaderNode = preloader;
                this.parentNode.appendChild(preloader);
                // This delay ensures the class will be bound so it doesnt snap on screen (maybe a better way)
                setTimeout(function() {
                    this.preloaderNode.className = 'visible';
                }.bind(this), 50);
            }
        }.bind(this), 0);
    };

    this.removeLoader = function() {
        if(this.loaded && this.preloaderNode !== null && this.parentNode !== null) {
            this.preloaderNode.className = '';
            // Remove the pre-loader from DOM once CSS Anim finishes, amend delay to compensate
            setTimeout(function() {
                this.parentNode.removeChild(this.preloaderNode);
            }.bind(this), 2500);
        }
    };
};

module.exports = Preloader;
