<html>
<body>
<h1>Test Json File erstellen</h1>
<?php
    //open connection to mysql db
    $connection = mysqli_connect("176.28.55.242","admin_pb","joyBr9yaT0") or die("Error " . mysqli_error($connection));

    //fetch table rows from mysql db
    $sql = "SELECT * FROM db_personabrowser.wp_posts where post_type = 'persona_post'";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }

    //Test Echo of json-Data
    echo json_encode($emparray);

    //write to json file
    $fp = fopen('test.json', 'w');
    fwrite($fp, json_encode($emparray));
    fclose($fp);
?>
</body>
</html>
