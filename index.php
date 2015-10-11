<?php
    if(!isset($_GET["page"]) ){
        $_GET["page"] = 'home';
    };
?>
<!DOCTYPE html>
<html lang="en">
	<head>

		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
		<title>Nutrimeals - A tiffin service </title>

		<!-- Bootstrap -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
        <!-- Google Font : Roboto -->
        <link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css'>
		<!-- Font Awesome -->
		<link href="fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet">
		<!-- Simple-Line-Icons-Webfont -->
		<link href="fonts/Simple-Line-Icons-Webfont/simple-line-icons.css" rel="stylesheet">
		<!-- FlexSlider -->
		<link href="scripts/FlexSlider/flexslider.css" rel="stylesheet">
		<!-- Owl Carousel -->
		<link href="css/owl.carousel.css" rel="stylesheet">
		<link href="css/owl.theme.default.css" rel="stylesheet">
		<!-- Nivo Lightbox -->
		<link href="scripts/Nivo-Lightbox/nivo-lightbox.css" rel="stylesheet">
		<link href="scripts/Nivo-Lightbox/themes/default/default.css" rel="stylesheet">
		<!-- Style.css -->
		<link href="css/style.css" rel="stylesheet">

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

	</head>
	<body data-page="<?= $_GET["page"]; ?>">
		<?php
        switch($_GET["page"]){

        	case 'home':
            include_once 'template/header.php';
        		include_once 'template/home.php';
        		break;

        	case 'recipes':
        		$pagename = 'Recipes';
        		include_once 'template/header.php';
        		include_once 'template/recipe.html';

        		break;

            case 'meal-plan':
              $pagename = 'Meal Plan';
            	include_once 'template/header.php';
        		  include_once 'template/meal-plan.html';

        		break;

        	case 'faq':
        		$pagename = 'FAQs';
        		include_once 'template/header.php';
        		include_once 'template/faq.html';

        		break;

        	case 'about':
        		$pagename = 'About';
        		include_once 'template/header.php';
        		include_once 'template/about.html';

        		break;

        	default:
        		include_once 'template/header.php';
        		include_once 'template/home.html';
        		break;
        }

		include_once 'template/footer.html';
		?>

	</body>
</html>
