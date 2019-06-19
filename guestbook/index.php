
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css"/>
    </head>
    <?php
        require_once("config.php");
       
        if(!empty($_POST['user_message'])){
            $msg = $_POST['user_message']; 
            $name = $_POST['user_name'];   
            if(empty($name)){
                $name = "Аноним";
            }          
            $date = date('Y-m-d h:i:s', time());
          //  echo $name.' '.$date.' '.$msg;  
            $query = $pdo->prepare("INSERT INTO guestbook (name, date, message) VALUES (?,?,?)");       
            $query->bindParam(1, $name, PDO::PARAM_STR); 
            $query->bindParam(2, $date, PDO::PARAM_STR); 
            $query->bindParam(3, $msg, PDO::PARAM_STR); 
            $query->execute();
        }   

        
        $query = $pdo->query("SELECT * FROM guestbook");
        $result = $query->fetchAll();
    ?>
    <body>
    <div class="posts_area">
        <?php            
            foreach($result as $row){
               echo '<div class="post">';
               echo '<div class="post_info">';
               echo '<span class="post_date">'.$row[2].'</span>';
               echo '<span class="post_author">'.$row[1].'</span>';
               echo '</div>';
               echo '<p class="post_text">'.$row[3].'</p>';
               echo '</div>';
            }
        ?>
    </div>
    <form class = "input_area" method="POST">    
        <input class="user_name" name="user_name" type="text" placeholder="Имя">
        <textarea class="user_message" name="user_message" placeholder="Ваше сообщение" ></textarea>
        <input class="send_button" name="send_button" type="submit" value="Отправить">
    </form>
    <?php
        
          
    ?>
    </body>
</html>