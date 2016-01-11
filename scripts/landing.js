var animatePoints = function animatePoints() {

    var points = document.getElementsByClassName('point');

    var revealFirstPoint = function revealFirstPoint() {
        points[0].style.opacity = 1;
        points[0].style.transform = 'scaleX(1) translateY(0)';
        points[0].style.msTransform = 'scaleX(1) translateY(0)';
        points[0].style.WebkitTransform = 'scaleX(1) translateY(0)';
    };

    var revealSecondPoint = function revealSecondPoint() {
        points[1].style.opacity = 1;
        points[1].style.transform = 'scaleX(1) translateY(0)';
        points[1].style.msTransform = 'scaleX(1) translateY(0)';
        points[1].style.WebkitTransform = 'scaleX(1) translateY(0)';
    };

    var revealThirdPoint = function revealThirdPoint() {
        points[2].style.opacity = 1;
        points[2].style.transform = 'scaleX(1) translateY(0)';
        points[2].style.msTransform = 'scaleX(1) translateY(0)';
        points[2].style.WebkitTransform = 'scaleX(1) translateY(0)';                   
    };

    revealFirstPoint();
    revealSecondPoint();
    revealThirdPoint();
    
};
            
            