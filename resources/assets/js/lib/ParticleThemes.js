module.exports = {
    default: function() {
        return {
            number: {
                value: 55,
                density: {
                    enable: false,
                    value_area: 900
                }
            },
            color: {
                value: '#7a7d8c'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0.3,
                    color: '#59637d'
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: '',
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 0.7,
                random: true,
                anim: {
                    enable: false,
                    speed: 2.5,
                    opacity_min: 0.4,
                    sync: true
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 2,
                    sync: true
                }
            },
            line_linked: {
                enable: false,
                distance: 85,
                color: '#7a7d8c',
                opacity: 0.6,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 3000,
                    rotateY: 1200
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: false,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab:{
                        distance: 400,
                        line_linked:{
                            opacity: 1
                        }
                    },
                    bubble:{
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity : 8,
                        speed: 3
                    },
                    repulse:{
                        distance: 200,
                        duration: 0.4
                    },
                    push:{
                        particles_nb: 4
                    },
                    remove:{
                        particles_nb: 2
                    }
                },
                mouse:{}
            },
            retina_detect: true,
            array: []
        }
    },

    sparks: function() {
        return {
            number: {
                value: 155,
                density: {
                    enable: false,
                    value_area: 900
                }
            },
            color: {
                value: '#7a7d8c'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0.3,
                    color: '#59637d'
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: '',
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 0.7,
                random: true,
                anim: {
                    enable: false,
                    speed: 2.5,
                    opacity_min: 0.4,
                    sync: true
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 2,
                    sync: true
                }
            },
            line_linked: {
                enable: false,
                distance: 85,
                color: '#7a7d8c',
                opacity: 0.6,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 3000,
                    rotateY: 1200
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: false,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab:{
                        distance: 400,
                        line_linked:{
                            opacity: 1
                        }
                    },
                    bubble:{
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity : 8,
                        speed: 3
                    },
                    repulse:{
                        distance: 200,
                        duration: 0.4
                    },
                    push:{
                        particles_nb: 4
                    },
                    remove:{
                        particles_nb: 2
                    }
                },
                mouse:{}
            },
            retina_detect: true,
            array: []
        }
    }
}