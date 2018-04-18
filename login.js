<div className='login'>
                                    <UserNotFound errorUser={this.state.wrongPassword} />
                                    <WrongPassword errorPassword={this.state.userNotFound} />
                                    <form onSubmit={this.handleFormSubmit} clasName="form">
                                        <TextField
                                            required
                                            fullWidth
                                            type="email"
                                            label="Email"
                                            rowsMax="4"
                                            name="email"
                                            onChange={this.handleChange}
                                            margin="normal"
                                        /><br/>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Password"
                                            rowsMax="4"
                                            name="password"
                                            type="password"
                                            onChange={this.handleChange}
                                            margin="normal"
                                        /><br /><br />
                                        <Button type='submit' variant="raised" color="primary">
                                            Login
                                        </Button>
                                    </form>
                                </div>