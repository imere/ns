# PHP 与 MySQL 开发入门

## PHP

```php
<?php
class Person
{
 private $age;

 public function __construct($age)
 {
  $this->age = $age;
 }

 public function say($word = '')
 {
  if (is_null($word)) {
   throw new Exception('argument $word is NULL', 1);
  }
  echo '<h1>' . $this->age . "$word</h1>\n";
 }

 public function __set($k, $v)
 {
  if ($k == '3') {
   $this->k = '3';
   echo 'k is 3';
  }
   else $this->k = $v;
 }

 public function __get($k)
 {
  if ($k == 'ue') {
   return 'k is ue';
  }
 }

//  public function __isset($k)
//  {
//   return false;
//  }

 public function __unset($k)
 {
  if ($k == 'age') {
   unset($this->age);
  }
 }

 public function __toString()
 {
   return (string)$this->age; // 必须是字符串
 }

 public function __destruct()
 {
  print "\n" . 'destruct';
 }
}
$c = new Person(23);
$c->say(); // <h1>23</h1>

$c->k = '50';
var_dump($c->k); // string(1) "3"

echo $c->ue; // k is ue

echo "\n";
echo isset($c->age) ? "set\n" : "not\n"; // not

$c1 = clone $c;

unset($c->age);

echo $c; // 空字符串
echo $c1; // 23
```

### 抽象类, 接口

- 含有抽象方法的类必须是抽象类
- 抽象类不一定含抽象方法
- 抽象类可以存在普通方法
- 抽象类不能被实例化

```php
<?php
interface Action
{
  const NAME = 'name';
  public function study();
}
abstract class Person
{
  public function normal()
  {
    echo 'normal';
  }

  public abstract function fn();
}
class Student extends Person implements Action
{
  const data = 'data';
  public function fn()
  {
    echo self::data;
  }

  public function study()
  {
    parent::normal();
  }
}
$c = new Student();
$c->study(); // normal
echo $c::NAME; // name
```

### 错误

```php
<?php
try {
  $code = 1;
  throw new Exception('message', $code);
} catch (Exception $e) {
  echo 'file ' . $e->getFile() . "\n";
  echo 'line ' . $e->getLine() . "\n";
  echo 'code ' . $e->getCode() . "\n";
  echo 'mesg ' . $e->getMessage();
}
```
