<div className="card">
    <UserAlreadyExist errorUserExist={this.state.userAlreadyExist} />
    <InvalidData errorInvalid={this.state.invalidData} />
    <h1>SignUp</h1>
    <form onSubmit={this.handleFormSubmitS}>
        <TextField
            required
            label="Full Name"
            rowsMax="4"
            name="nameS"
            onChange={this.handleChange}
            margin="normal"
        />
        <TextField
            required
            pattern="[789][0-9]{9}"
            label="Contact No"
            rowsMax="4"
            name="contactnoS"
            max="10"
            onChange={this.handleChange}
            margin="normal"
        />
        <TextField
            required
            type="email"
            label="Email"
            rowsMax="4"
            name="emailS"
            onChange={this.handleChange}
            margin="normal"
        />
        <TextField
            label="Password"
            type="password"
            name="passwordS"
            autoComplete="current-password"
            margin="normal"
        />
        <input
            className="form-submit"
            value="SUBMIT"
            type="submit"
        />
    </form>
</div>