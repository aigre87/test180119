
function customizeSelect( $element ){
    var $sBox = $element.find("select");
    if( !$sBox.length > 0 ){return false;}
    $sBox.each(function(){
        $(this).select2({
            width: '100%',
            minimumResultsForSearch: -1
        });
    });
};

function customizeCheckbox( $element ){
    var $cBox = $element.find("input[type='checkbox']");
    if( !$cBox.length > 0 ){return false;}
    $cBox.each(function(){
        $(this).wrap("<span class='custom-checkbox' />").after('<span class="box"><span class="tick"></span></span>');
    });
};

$(document).ready(function() {
    customizeSelect( $("#usersGrid .item") );
    customizeCheckbox( $("#usersGrid .item") );
});