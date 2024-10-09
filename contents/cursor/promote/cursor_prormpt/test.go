package User

type User struct {
	Name string
	Age int64
	Address string
}

func GenTenUserList() []User{
	var users []User
	users = append(users,User{
		Name: "xx Block",
		Age: 1,
		Address: "1", 
	})
	users = append(users, User{
		Name: "xx Block",
		Age: 1,
		Address: "2",
	})
	users = append(users, User{
		Name: "xx Block",
		Age: 1,
		Address: "3",
	})

	return users
}