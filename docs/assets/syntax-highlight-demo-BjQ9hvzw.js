import{_ as r}from"./code-viewer.vue_vue_type_script_setup_true_lang-BYpU-SkN.js";import{S as i}from"./index-COAt9MiN.js";/* empty css               */import{s as g}from"./syntax-highlight-code-DgCuU-5Z.js";import{d as f,c as b,o as h,a as t,b as a,u as e}from"./index-CCsrM5Sh.js";const _=`// 这是一个TypeScript示例
interface User {
  id: number;
  name: string;
  email?: string;
  age: number;
}

// 类型注解
function getUserInfo(user: User): string {
  return \`用户 \${user.name} (ID: \${user.id}) 年龄: \${user.age}岁\`;
}

// 泛型
class DataStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  getItems(): T[] {
    return this.data;
  }
}

// 枚举类型
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

// 类型别名和联合类型
type ID = string | number;
type UserRole = "admin" | "editor" | "viewer";

function processUser(id: ID, role: UserRole): void {
  console.log(\`处理ID为 \${id} 的 \${role} 用户\`);
}

// 实现接口的类
class Customer implements User {
  id: number;
  name: string;
  age: number;
  points: number;

  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.points = 0;
  }

  addPoints(points: number): void {
    this.points += points;
  }
}

// 使用示例
const userStore = new DataStore<User>();
const alice = new Customer(1, "Alice", 28);
alice.addPoints(100);
userStore.add(alice);

const bob: User = { id: 2, name: "Bob", age: 34 };
userStore.add(bob);

console.log(userStore.getItems());
console.log(getUserInfo(alice));
processUser("ABC123", "admin");`,S=`# 这是一个Python示例
import math
from typing import List, Dict, Optional, Tuple

# 函数定义
def calculate_distance(x1: float, y1: float, x2: float, y2: float) -> float:
    """计算两点之间的欧几里得距离"""
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

# 类定义
class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y
    
    def distance_to(self, other: 'Point') -> float:
        return calculate_distance(self.x, self.y, other.x, other.y)
    
    def __str__(self) -> str:
        return f"Point({self.x}, {self.y})"

# 列表推导式
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
odd_numbers = [n for n in numbers if n % 2 != 0]
print(f"奇数: {odd_numbers}")

# 字典和字典推导式
user_scores = {"Alice": 95, "Bob": 87, "Charlie": 92, "David": 78}
high_scorers = {name: score for name, score in user_scores.items() if score >= 90}
print(f"高分用户: {high_scorers}")

# 装饰器
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} 执行时间: {end_time - start_time:.4f} 秒")
        return result
    return wrapper

@timer
def slow_function(n: int) -> int:
    import time
    time.sleep(1)  # 模拟耗时操作
    return sum(range(n))

# 异常处理
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"错误: {e}")
finally:
    print("异常处理完成")

# 上下文管理器
class TempFile:
    def __init__(self, filename: str):
        self.filename = filename
    
    def __enter__(self):
        self.file = open(self.filename, 'w')
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        # 在实际应用中可能还需要删除临时文件

# 使用示例
if __name__ == "__main__":
    p1 = Point(0, 0)
    p2 = Point(3, 4)
    print(f"两点距离: {p1.distance_to(p2)}")
    
    result = slow_function(1000000)
    print(f"计算结果: {result}")`,v=`/**
 * Java语法高亮示例代码
 * 展示Java语言的语法高亮功能
 */
public class JavaExample {
    // 常量定义
    private static final String GREETING = "Hello, Java!";
    private static final int MAX_COUNT = 100;
    
    // 实例变量
    private String name;
    private int count;
    
    /**
     * 构造函数
     * @param name 名称
     */
    public JavaExample(String name) {
        this.name = name;
        this.count = 0;
    }
    
    /**
     * 主方法
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        // 创建对象实例
        JavaExample example = new JavaExample("Example");
        
        // 调用方法
        example.printGreeting();
        
        // 循环示例
        for (int i = 0; i < 5; i++) {
            example.incrementCount();
        }
        
        // 条件语句示例
        if (example.getCount() > 3) {
            System.out.println("Count is greater than 3");
        } else {
            System.out.println("Count is not greater than 3");
        }
        
        // 数组示例
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = example.calculateSum(numbers);
        System.out.println("Sum: " + sum);
    }
    
    // 实例方法
    public void printGreeting() {
        System.out.println(GREETING + " My name is " + this.name);
    }
    
    // 增加计数器
    public void incrementCount() {
        this.count++;
        System.out.println("Current count: " + this.count);
    }
    
    // 获取计数值
    public int getCount() {
        return this.count;
    }
    
    // 计算数组元素和
    public int calculateSum(int[] numbers) {
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return sum;
    }
    
    // 内部类示例
    class InnerClass {
        private String description;
        
        public InnerClass(String description) {
            this.description = description;
        }
        
        public void display() {
            System.out.println("Inner class: " + this.description);
            System.out.println("Outer class name: " + JavaExample.this.name);
        }
    }
    
    // 枚举类型示例
    enum Status {
        ACTIVE, INACTIVE, PENDING, COMPLETED;
        
        public boolean isActive() {
            return this == ACTIVE;
        }
    }
}`,y=`// Go语法高亮示例代码
// 展示Go语言的语法高亮功能

package main

import (
	"fmt"
	"math/rand"
	"time"
)

// 常量定义
const (
	MaxCount = 100
	AppName  = "Go Example"
)

// 结构体定义
type Person struct {
	Name    string
	Age     int
	Address string
}

// 为Person结构体定义方法
func (p *Person) SayHello() string {
	return fmt.Sprintf("Hello, my name is %s and I am %d years old.", p.Name, p.Age)
}

// 接口定义
type Speaker interface {
	SayHello() string
}

// 实现接口的另一个结构体
type Robot struct {
	ID      string
	Version float64
}

func (r *Robot) SayHello() string {
	return fmt.Sprintf("Greetings, I am robot %s, version %.1f", r.ID, r.Version)
}

// 自定义错误类型
type CustomError struct {
	Message string
	Code    int
}

func (e *CustomError) Error() string {
	return fmt.Sprintf("Error %d: %s", e.Code, e.Message)
}

// 生成随机数的函数
func generateRandomNumber(max int) int {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	return r.Intn(max)
}

// 主函数
func main() {
	// 打印欢迎信息
	fmt.Println("Welcome to", AppName)

	// 创建Person实例
	person := &Person{
		Name:    "Alice",
		Age:     28,
		Address: "123 Main St",
	}

	// 创建Robot实例
	robot := &Robot{
		ID:      "R2D2",
		Version: 2.1,
	}

	// 使用接口
	speakers := []Speaker{person, robot}
	for _, speaker := range speakers {
		fmt.Println(speaker.SayHello())
	}

	// 使用goroutine和channel
	ch := make(chan int, 5)
	go func() {
		for i := 0; i < 5; i++ {
			ch <- generateRandomNumber(MaxCount)
		}
		close(ch)
	}()

	// 从channel读取数据
	fmt.Println("Random numbers:")
	for num := range ch {
		fmt.Printf("%d ", num)
	}
	fmt.Println()

	// 错误处理示例
	if err := processData("sample"); err != nil {
		fmt.Println("Error occurred:", err)
	} else {
		fmt.Println("Data processed successfully")
	}

	// 使用defer
	defer fmt.Println("Program finished")

	// 切片操作
	numbers := []int{1, 2, 3, 4, 5}
	fmt.Println("Original slice:", numbers)
	numbers = append(numbers, 6, 7, 8)
	fmt.Println("After append:", numbers)

	// Map操作
	userRoles := map[string]string{
		"alice": "admin",
		"bob":   "user",
		"carol": "manager",
	}

	fmt.Println("User roles:")
	for user, role := range userRoles {
		fmt.Printf("%s: %s\\n", user, role)
	}
}

// 可能返回错误的函数
func processData(data string) error {
	if len(data) == 0 {
		return &CustomError{
			Message: "Empty data provided",
			Code:    400,
		}
	}

	// 处理数据...
	return nil
}`,x=`/**
 * C语法高亮示例代码
 * 展示C语言的语法高亮功能
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// 宏定义
#define MAX_LENGTH 100
#define SQUARE(x) ((x) * (x))
#define DEBUG_MODE

// 结构体定义
typedef struct {
    char name[MAX_LENGTH];
    int age;
    float score;
} Student;

// 枚举定义
enum Color {
    RED,
    GREEN,
    BLUE,
    YELLOW,
    BLACK,
    WHITE
};

// 函数原型声明
void printStudent(const Student* student);
int compareStudents(const Student* s1, const Student* s2);
Student* createStudent(const char* name, int age, float score);
void freeStudent(Student* student);
int factorial(int n);

/**
 * 主函数
 */
int main(int argc, char* argv[]) {
    // 打印欢迎信息
    printf("Welcome to C Example Program!\\n");
    
    // 变量声明和初始化
    int numbers[5] = {1, 2, 3, 4, 5};
    char message[] = "Hello, C!";
    bool isActive = true;
    
    // 使用宏
    int squared = SQUARE(5);
    printf("5 squared is: %d\\n", squared);
    
    // 条件语句
    if (isActive) {
        printf("Program is active\\n");
    } else {
        printf("Program is inactive\\n");
    }
    
    // 循环示例
    printf("Numbers: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");
    
    // 使用枚举
    enum Color selectedColor = BLUE;
    switch (selectedColor) {
        case RED:
            printf("Selected color: Red\\n");
            break;
        case GREEN:
            printf("Selected color: Green\\n");
            break;
        case BLUE:
            printf("Selected color: Blue\\n");
            break;
        default:
            printf("Other color selected\\n");
    }
    
    // 使用结构体
    Student student1;
    strcpy(student1.name, "John Doe");
    student1.age = 20;
    student1.score = 85.5;
    
    printf("Student information:\\n");
    printStudent(&student1);
    
    // 动态内存分配
    Student* student2 = createStudent("Jane Smith", 22, 92.0);
    printf("\\nDynamically allocated student:\\n");
    printStudent(student2);
    
    // 计算阶乘
    int num = 5;
    printf("\\nFactorial of %d is %d\\n", num, factorial(num));
    
    // 指针操作
    int value = 10;
    int* ptr = &value;
    printf("\\nValue: %d\\n", value);
    printf("Pointer points to: %d\\n", *ptr);
    *ptr = 20;
    printf("After modification, value: %d\\n", value);
    
    // 释放动态分配的内存
    freeStudent(student2);
    
    // 条件编译
#ifdef DEBUG_MODE
    printf("\\nDebug mode is enabled\\n");
#endif
    
    return 0;
}

/**
 * 打印学生信息
 */
void printStudent(const Student* student) {
    printf("Name: %s\\n", student->name);
    printf("Age: %d\\n", student->age);
    printf("Score: %.1f\\n", student->score);
}

/**
 * 比较两个学生的分数
 */
int compareStudents(const Student* s1, const Student* s2) {
    if (s1->score > s2->score) return 1;
    if (s1->score < s2->score) return -1;
    return 0;
}

/**
 * 创建学生对象
 */
Student* createStudent(const char* name, int age, float score) {
    Student* student = (Student*)malloc(sizeof(Student));
    if (student == NULL) {
        fprintf(stderr, "Memory allocation failed\\n");
        exit(1);
    }
    
    strcpy(student->name, name);
    student->age = age;
    student->score = score;
    
    return student;
}

/**
 * 释放学生对象内存
 */
void freeStudent(Student* student) {
    free(student);
}

/**
 * 计算阶乘（递归实现）
 */
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,C=`/**
 * C++语法高亮示例代码
 * 展示C++语言的语法高亮功能
 */

#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <algorithm>
#include <map>

// 命名空间
namespace Example {

// 常量定义
const int MAX_STUDENTS = 100;

// 类定义
class Person {
protected:
    std::string name;
    int age;

public:
    // 构造函数
    Person(const std::string& name, int age) : name(name), age(age) {}
    
    // 虚析构函数
    virtual ~Person() {
        std::cout << "Person destructor called" << std::endl;
    }
    
    // 虚函数
    virtual void display() const {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
    
    // Getter方法
    std::string getName() const { return name; }
    int getAge() const { return age; }
    
    // Setter方法
    void setName(const std::string& newName) { name = newName; }
    void setAge(int newAge) { age = newAge; }
};

// 继承
class Student : public Person {
private:
    std::string studentId;
    std::vector<double> grades;
    
public:
    // 构造函数
    Student(const std::string& name, int age, const std::string& id)
        : Person(name, age), studentId(id) {}
    
    // 析构函数
    ~Student() override {
        std::cout << "Student destructor called" << std::endl;
    }
    
    // 重写虚函数
    void display() const override {
        std::cout << "Student - Name: " << name << ", Age: " << age
                  << ", ID: " << studentId << std::endl;
        
        if (!grades.empty()) {
            std::cout << "Grades: ";
            for (const auto& grade : grades) {
                std::cout << grade << " ";
            }
            std::cout << std::endl;
            
            double average = calculateAverage();
            std::cout << "Average: " << average << std::endl;
        }
    }
    
    // 添加成绩
    void addGrade(double grade) {
        grades.push_back(grade);
    }
    
    // 计算平均成绩
    double calculateAverage() const {
        if (grades.empty()) return 0.0;
        
        double sum = 0.0;
        for (const auto& grade : grades) {
            sum += grade;
        }
        
        return sum / grades.size();
    }
    
    // 获取学生ID
    std::string getStudentId() const { return studentId; }
};

// 模板类
template<typename T>
class Container {
private:
    std::vector<T> elements;
    
public:
    // 添加元素
    void add(const T& element) {
        elements.push_back(element);
    }
    
    // 获取元素
    T& get(size_t index) {
        if (index >= elements.size()) {
            throw std::out_of_range("Index out of range");
        }
        return elements[index];
    }
    
    // 获取大小
    size_t size() const {
        return elements.size();
    }
    
    // 排序元素
    void sort() {
        std::sort(elements.begin(), elements.end());
    }
};

} // namespace Example

// 主函数
int main() {
    using namespace Example;
    
    std::cout << "C++ Example Program" << std::endl;
    
    // 创建智能指针
    auto student1 = std::make_shared<Student>("Alice", 20, "S12345");
    auto student2 = std::make_shared<Student>("Bob", 22, "S67890");
    
    // 添加成绩
    student1->addGrade(85.5);
    student1->addGrade(92.0);
    student1->addGrade(78.5);
    
    student2->addGrade(90.0);
    student2->addGrade(88.5);
    student2->addGrade(95.0);
    
    // 显示学生信息
    std::cout << "\\nStudent Information:" << std::endl;
    student1->display();
    std::cout << std::endl;
    student2->display();
    
    // 使用容器
    Container<std::string> nameContainer;
    nameContainer.add("Alice");
    nameContainer.add("Bob");
    nameContainer.add("Charlie");
    
    std::cout << "\\nNames in container:" << std::endl;
    for (size_t i = 0; i < nameContainer.size(); ++i) {
        std::cout << nameContainer.get(i) << std::endl;
    }
    
    // 使用Lambda表达式
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3};
    std::cout << "\\nOriginal numbers:";
    for (const auto& num : numbers) {
        std::cout << " " << num;
    }
    
    // 使用Lambda排序
    std::sort(numbers.begin(), numbers.end(), 
              [](int a, int b) { return a < b; });
    
    std::cout << "\\nSorted numbers:";
    for (const auto& num : numbers) {
        std::cout << " " << num;
    }
    
    // 使用map
    std::map<std::string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 89;
    scores["Charlie"] = 92;
    
    std::cout << "\\n\\nScores:" << std::endl;
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << std::endl;
    }
    
    // 异常处理
    try {
        Container<int> intContainer;
        intContainer.add(10);
        std::cout << "\\nElement at index 0: " << intContainer.get(0) << std::endl;
        std::cout << "Element at index 1: " << intContainer.get(1) << std::endl; // 将抛出异常
    } catch (const std::exception& e) {
        std::cerr << "Exception caught: " << e.what() << std::endl;
    }
    
    std::cout << "\\nProgram completed successfully" << std::endl;
    return 0;
}`,E={class:"p-4"},P={class:"mb-8"},A={class:"h-96"},I={class:"mb-8"},N={class:"h-96"},D={class:"mb-8"},R={class:"h-96"},w={class:"mb-8"},G={class:"h-96"},T={class:"mb-8"},U={class:"h-96"},L={class:"mb-8"},k={class:"h-96"},H={class:"mb-8"},z={class:"h-96"},j=f({__name:"syntax-highlight-demo",setup(B){const o=g.split(`
`).map((s,n)=>({id:`js-line-${n+1}`,content:s})),d=_.split(`
`).map((s,n)=>({id:`ts-line-${n+1}`,content:s})),u=S.split(`
`).map((s,n)=>({id:`py-line-${n+1}`,content:s})),l=v.split(`
`).map((s,n)=>({id:`java-line-${n+1}`,content:s})),m=y.split(`
`).map((s,n)=>({id:`go-line-${n+1}`,content:s})),c=x.split(`
`).map((s,n)=>({id:`c-line-${n+1}`,content:s})),p=C.split(`
`).map((s,n)=>({id:`cpp-line-${n+1}`,content:s}));return(s,n)=>(h(),b("div",E,[n[7]||(n[7]=t("div",{class:"mb-4"},[t("h3",{class:"text-lg font-medium text-gray-800 mb-2"},"语法高亮插件"),t("p",{class:"text-sm text-gray-600"},"这个示例展示了代码语法高亮功能。")],-1)),t("div",P,[n[0]||(n[0]=t("h4",{class:"text-md font-medium text-gray-700 mb-2"},"JavaScript",-1)),t("div",A,[a(e(r),{code:e(o),plugins:[e(i)],language:"javascript",size:"medium"},null,8,["code","plugins"])])]),t("div",I,[n[1]||(n[1]=t("h4",{class:"text-md font-medium text-gray-700 mb-2"},"TypeScript",-1)),t("div",N,[a(e(r),{code:e(d),plugins:[e(i)],language:"typescript",size:"medium"},null,8,["code","plugins"])])]),t("div",D,[n[2]||(n[2]=t("h4",{class:"text-md font-medium text-gray-700 mb-2"},"Python",-1)),t("div",R,[a(e(r),{code:e(u),plugins:[e(i)],language:"python",size:"medium"},null,8,["code","plugins"])])]),t("div",w,[n[3]||(n[3]=t("h4",{class:"text-md font-medium text-gray-700 mb-2"},"Java",-1)),t("div",G,[a(e(r),{code:e(l),plugins:[e(i)],language:"java",size:"medium"},null,8,["code","plugins"])])]),t("div",T,[n[4]||(n[4]=t("h4",{class:"text-md font-medium text-gray-700 mb-2"},"Go",-1)),t("div",U,[a(e(r),{code:e(m),plugins:[e(i)],language:"go",size:"medium"},null,8,["code","plugins"])])]),t("div",L,[n[5]||(n[5]=t("h4",{class:"text-md font-medium text-gray-700 mb-2"},"C",-1)),t("div",k,[a(e(r),{code:e(c),plugins:[e(i)],language:"c",size:"medium"},null,8,["code","plugins"])])]),t("div",H,[n[6]||(n[6]=t("h4",{class:"text-md font-medium text-gray-700 mb-2"},"C++",-1)),t("div",z,[a(e(r),{code:e(p),plugins:[e(i)],language:"cpp",size:"medium"},null,8,["code","plugins"])])])]))}});export{j as default};
